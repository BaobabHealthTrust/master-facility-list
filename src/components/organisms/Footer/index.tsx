import React from "react";

export default () => {
  return (
    <div style={{ height: "60px" }}>
      <footer className="light-blue darken-4 align-middle">
        <div className="row px-4 py-4 mx-0 my-0">
          <div className="col s6 m6">
            <img
              style={{ width: 90, height: 30 }}
              src="/static/images/kuunika_logo.png"
            />
          </div>

          <div className="col s6 m6 white-text text-right">
            <span className="mfl-copy text-left mt-4">
              © {new Date().getFullYear()} Copyright, Republic of Malawi,
              Ministry of Health
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
};
