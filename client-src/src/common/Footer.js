import React from "react";
import kuunika_logo from '../kuunika_logo.png';


export default (props) => {
    return (
        <footer className="page-footer light-blue darken-4 align-middle pt-1" >
        <div className="row mfl-no-margin mx-0 my-0">

                <div className="col m4 white-text" style={{ margin: 0}}>
                    <img style={{ width: 90, height: 30 }} src={kuunika_logo} />
                  </div>

                  <div className="col m4 white-text text-center">
                      <p className="white-text text-lighten-4">
                        <a href="mailto:moh@health.gov.mw">moh@health.gov.mw</a>
                      </p>
                  </div>

                  <div className="col m4 white-text text-right">
                      <span className="mfl-copy text-left">© {(new Date()).getFullYear()} Copyright, Republic of Malawi, Ministry of Health</span>
                  </div>

              </div>
        </footer>
    )
}
