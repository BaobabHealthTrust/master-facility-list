//@flow
import React, { Component } from "react";
import Card from "../common/MflCard";
import footerResizer from "../helpers/footerResize";
import { checkCredentials } from "../actions";
import { connect } from "react-redux";

type State = {
    username: string,
    password: string
};
type Props = {
    checkCredentials: Function
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
        await console.log(this.props.loginResponse);
    };

    render() {
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
const mapStateToProps = state => {
    return {
        loginResponse: state.authReducer
    };
};

export default connect(mapStateToProps, { checkCredentials })(MflLogin);
