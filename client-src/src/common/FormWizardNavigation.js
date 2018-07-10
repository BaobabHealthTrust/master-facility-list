import React from 'react';
import { Button } from 'react-materialize';

export default (props) => {
  const { handleSubmit, isSubmitting } = props;
  return (
    <div style={{
      padding: 10,
      backgroundColor: '#eee',
      marginBottom: 140,
      display: 'flex',
      justifyContent: 'flex-end'
    }}
    >
      {
        props.saveButton && (
          <Button
            className="mfl-rm-2"
            onClick={handleSubmit}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Saving..." : props.saveButton}
          </Button>

        )
      }
      <Button
        flat
        onClick={props.handleCancel}
      >
        Cancel
      </Button>
    </div>
  )
}
