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
            <Button
                className="mfl-rm-2"
                onClick={handleSubmit}
                disabled={isSubmitting}
            >
                {isSubmitting ? "Saving..." : "Next"}
            </Button>
            <Button
                flat
                onClick={() => console.log('going back')}
            >
                Or Cancel
            </Button>
        </div>
    )
}
