import React from "react";
import kuunika_logo from "../kuunika_logo.png";
import { Button } from "react-materialize";

export default props => {
  return (
    <div className="footer">
      <a href="#" className="pin-r" id="back-to-top" title="Back to top">
        <Button
          floating
          small="true"
          className="absolute mr-4 pin-r blue"
          style={{ bottom: "10px", right: "10px", position: "fixed" }}
        >
          <i className="material-icons">keyboard_arrow_up</i>
        </Button>
      </a>
      <footer className="light-blue darken-4 align-middle">
        <div className="row px-4 py-4 mx-0 my-0">
          <div className="col m6">
            <img style={{ width: 90, height: 30 }} src={kuunika_logo} />
          </div>

          <div className="col m6 white-text text-right">
            <span className="mfl-copy text-left mt-4">
              © {new Date().getFullYear()} , Republic of Malawi, Ministry of
              Health
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
};
