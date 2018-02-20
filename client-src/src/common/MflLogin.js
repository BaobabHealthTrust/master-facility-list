import React, { Component } from "react";
import Card from "../common/MflCard";
import footerResizer from "../helpers/footerResize";

class MflLogin extends Component {

    render() {
        return (
            <div className="container mfl-container">
                <div className="mfl-login-container blue darken-4">
                    <h4 className="white-text">Login Here</h4>
                    <div className="mfl-tm-5" />
                    <div className="mfl-login-input-container">
                        <div className="mfl-login-icon grey lighten-2 grey-text"><i className="material-icons">perm_identity</i></div>
                        <input type="text" name="username" className="mfl-login-input" placeholder="Username" />
                    </div>
                    <div className="mfl-tm-2" />
                    <div className="mfl-login-input-container">
                        <div className="mfl-login-icon grey lighten-2 grey-text"><i className="material-icons">lock</i></div>
                        <input type="password" name="password" className="mfl-login-input" placeholder="Password" />
                    </div>
                    <div className="mfl-tm-5" />
                    <a className="btn-large blue accent-1">Login</a>
                </div>
            </div>
        );
    }
}


export default MflLogin;
