import React from "react";
import { Button } from "react-materialize";

export default props => {
  const { handleSubmit, isSubmitting } = props;
  return (
    <div
      style={{
        padding: 10,
        backgroundColor: "#eee",
        display: "flex",
        justifyContent: "flex-end"
      }}
    >
      {props.saveButton && (
        <Button
          waves="blue"
          style={{ backgroundColor: "#5a90dc" }}
          className="mfl-rm-2"
          onClick={handleSubmit}
          disabled={isSubmitting}
        >
          {isSubmitting ? "Saving..." : props.saveButton}
        </Button>
      )}
      <Button flat onClick={props.handleCancel}>
        Cancel
      </Button>
    </div>
  );
};
