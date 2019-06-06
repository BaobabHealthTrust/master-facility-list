import React, { useState } from "react";
import ListItem from "./FacilityMobileListItem";
import { chunk } from "lodash";
import { Button } from "react-materialize";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class FacilityMobileList extends React.Component {
  state = {
    page: 0
  };
  render() {
    let data = chunk(this.props.facilities, 7);
    return (
      <React.Fragment>
        <div>
          {data.length > 0 &&
            data[this.state.page].map(facility => (
              <ListItem
                facility={facility}
                onClick={() => this.props.onClick(facility)}
              />
            ))}
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: "10px",
            alignItems: "center",
            marginTop: "10px"
          }}
        >
          <Button
            onClick={() => {
              if (this.state.page > 0)
                this.setState({ page: this.state.page - 1 });
            }}
          >
            <FontAwesomeIcon icon={faArrowLeft} />
          </Button>
          <div>
            Page {this.state.page + 1} of {data.length}
          </div>
          <Button
            onClick={() => {
              if (this.state.page < data.length)
                this.setState({ page: this.state.page + 1 });
            }}
          >
            <FontAwesomeIcon icon={faArrowRight} />
          </Button>
        </div>
      </React.Fragment>
    );
  }
}

export default FacilityMobileList;
