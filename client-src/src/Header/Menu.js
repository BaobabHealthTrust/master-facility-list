import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { Dropdown, NavItem, Button } from "react-materialize";

class Menu extends Component {
    constructor() {
        super();
        this.state = {
            activePage: "home"
        };
    }

    render() {
        return (
            <div>
                <ul
                    id="nav-mobile"
                    className="right mfl-pr-10 hide-on-med-and-down"
                >
                    <li
                        className={
                            this.state.activePage === "home" ? "active" : ""
                        }
                    >
                        <Link
                            to="/"
                            onClick={e => this.setState({ activePage: "home" })}
                        >
                            HOME
                        </Link>
                    </li>

                    <li
                        className={
                            this.state.activePage === "about" ? "active" : ""
                        }
                    >
                        <Link
                            to="/about"
                            onClick={e =>
                                this.setState({ activePage: "about" })
                            }
                        >
                            ABOUT
                        </Link>
                    </li>

                    <li
                        className={
                            this.state.activePage === "facilities"
                                ? "active"
                                : ""
                        }
                    >
                        <Link
                            to="/facilities"
                            onClick={e =>
                                this.setState({ activePage: "facilities" })
                            }
                        >
                            FACILITIES
                        </Link>
                    </li>

                    <li
                        className={
                            this.state.activePage === "feedback" ? "active" : ""
                        }
                    >
                        <Link
                            to="/feedback"
                            onClick={e =>
                                this.setState({ activePage: "feedback" })
                            }
                        >
                            FEEDBACK
                        </Link>
                    </li>

                    {sessionStorage.getItem("token") ? (
                        <Dropdown
                            trigger={
                                <li className="mfl-nav-icon">
                                    <i className="material-icons">person</i>
                                </li>
                            }
                        >
                            <NavItem className="mfl-nav-item">
                                <i className="material-icons mfl-nav-item">
                                    people
                                </i>Edit Profile
                            </NavItem>
                            <NavItem divider />
                            <NavItem>
                                <i className="material-icons">lock</i>Logout
                            </NavItem>
                        </Dropdown>
                    ) : (
                        // <li>
                        //     <a
                        //         id="dropdown-btn"
                        //         className="dropdown-button "
                        //         href="#"
                        //         data-activates="dropdown1"
                        //     >
                        //         <i className="material-icons">person</i>
                        //     </a>
                        //     <ul id="dropdown1" className="dropdown-content">
                        //         <li>
                        //             <a href="#!">
                        //                 <i className="material-icons">edit</i>Edit
                        //                 profile
                        //             </a>
                        //         </li>
                        //         <li className="divider" />
                        //         <li>
                        //             <a href="#!">
                        //                 <i className="material-icons">lock</i>Logout
                        //             </a>
                        //         </li>
                        // </ul>
                        // </li>
                        <li
                            className={
                                this.state.activePage === "login"
                                    ? "active"
                                    : ""
                            }
                        >
                            {" "}
                            <Link
                                to="/login"
                                onClick={e =>
                                    this.setState({ activePage: "login" })
                                }
                            >
                                LOGIN
                            </Link>
                        </li>
                    )}
                </ul>
                <ul class="side-nav" id="mobile-demo">
                    <li
                        className={
                            this.state.activePage === "home" ? "active" : ""
                        }
                    >
                        <Link
                            to="/"
                            onClick={e => this.setState({ activePage: "home" })}
                        >
                            HOME
                        </Link>
                    </li>

                    <li
                        className={
                            this.state.activePage === "about" ? "active" : ""
                        }
                    >
                        <Link
                            to="/about"
                            onClick={e =>
                                this.setState({ activePage: "about" })
                            }
                        >
                            ABOUT
                        </Link>
                    </li>

                    <li
                        className={
                            this.state.activePage === "facilities"
                                ? "active"
                                : ""
                        }
                    >
                        <Link
                            to="/facilities"
                            onClick={e =>
                                this.setState({ activePage: "facilities" })
                            }
                        >
                            FACILITIES
                        </Link>
                    </li>

                    <li
                        className={
                            this.state.activePage === "feedback" ? "active" : ""
                        }
                    >
                        <Link
                            to="/feedback"
                            onClick={e =>
                                this.setState({ activePage: "feedback" })
                            }
                        >
                            FEEDBACK
                        </Link>
                    </li>
                    {sessionStorage.getItem("token") == "" ? (
                        <li
                            className={
                                this.state.activePage === "login"
                                    ? "active"
                                    : ""
                            }
                        >
                            <Link
                                to="/login"
                                onClick={e =>
                                    this.setState({ activePage: "login" })
                                }
                            >
                                LOGIN
                            </Link>
                        </li>
                    ) : (
                        <li
                            className={
                                this.state.activePage === "login"
                                    ? "active"
                                    : ""
                            }
                        >
                            <Link
                                to="/login"
                                onClick={e =>
                                    this.setState({ activePage: "login" })
                                }
                            >
                                <i className="material_icons">person</i>
                            </Link>
                        </li>
                    )}
                </ul>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        userDetails: state.authReducer
    };
};

export default connect(mapStateToProps, {})(Menu);
