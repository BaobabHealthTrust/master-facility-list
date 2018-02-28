//@flow
import React, { Component } from "react";
import Card from "../common/MflCard";
import footerResizer from "../helpers/footerResize";
import { Redirect } from "react-router-dom";
import { checkCredentials, getUserDetails } from "../actions";
import { connect } from "react-redux";

type State = {
    username: string,
    password: string
};
type Props = {
    checkCredentials: Function,
    getUserDetails: Function
};
class MflLogin extends Component<State, Props> {
    state = {
        username: null,
        password: null
    };

    loginCredentials = async () => {
        await this.props.checkCredentials(
            this.state.username,
            this.state.password
        );
        console.log(this.props.loginResponse);
        if (!this.props.loginResponse.isLoginFailed) {
            await sessionStorage.setItem(
                "token",
                this.props.loginResponse.loginResponse.id
            );
            await this.props.getUserDetails(
                this.props.loginResponse.loginResponse.userId,
                this.props.loginResponse.loginResponse.id
            );
        }
    };
    render() {
        if (sessionStorage.getItem("token")) {
            return <Redirect to="/" />;
        } else {
            return (
                <div className="container mfl-container">
                    <div className="mfl-login-container blue darken-4">
                        <h4 className="white-text">
                            Login Here{this.props.loginResponse.isLoginFailed
                                ? "Wrong login credentials"
                                : ""}
                        </h4>
                        <div className="mfl-tm-5" />
                        <div className="mfl-login-input-container">
                            <div className="mfl-login-icon grey lighten-2 grey-text">
                                <i className="material-icons">perm_identity</i>
                            </div>
                            <input
                                onKeyUp={e =>
                                    this.setState({
                                        username: e.currentTarget.value
                                    })
                                }
                                type="text"
                                className="mfl-login-input"
                                placeholder="Username"
                            />
                        </div>
                        <div className="mfl-tm-2" />
                        <div className="mfl-login-input-container">
                            <div className="mfl-login-icon grey lighten-2 grey-text">
                                <i className="material-icons">lock</i>
                            </div>
                            <input
                                onKeyUp={e =>
                                    this.setState({
                                        password: e.currentTarget.value
                                    })
                                }
                                type="password"
                                className="mfl-login-input"
                                placeholder="Password"
                            />
                        </div>
                        <div className="mfl-tm-5" />
                        <a
                            onClick={this.loginCredentials}
                            className="btn-large blue accent-1"
                        >
                            Login
                        </a>
                    </div>
                </div>
            );
        }
    }
}
const mapStateToProps = state => {
    return {
        loginResponse: state.authReducer
    };
};

export default connect(mapStateToProps, { checkCredentials, getUserDetails })(
    MflLogin
);
