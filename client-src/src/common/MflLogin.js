import React, { Component } from "react";
import Card from "../common/MflCard";
import footerResizer from "../helpers/footerResize";

class MflLogin extends Component {
    render() {
        return (
            <div className="">

                <div className="row ">
                    <h4 className="mfl-contact mfl-login-header">Login Page</h4>
                    <div className="col m2 l2">
                        <span><i className=" medium material-icons mfl-login-icon ">account_box</i></span>
                    </div>
                    <div className="col s12 m10 l10 ">


                        <input className="mfl-login-form" type="text" />


                    </div>

                </div>
                <div className="row">
                    <div className="col m2 l2">
                        <span><i className=" medium material-icons mfl-login-icon ">account_box</i></span>
                    </div>
                    <div className="col s12 m10 l10 ">
                        < input className="mfl-login-form" type="text" />
                    </div>
                </div>


            </div>




        );
    }
}


export default MflLogin;
