import React, { Component } from "react";
import { Link } from "react-router-dom";

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
                            to=""
                            onClick={e =>
                                this.setState({ activePage: "feedback" })
                            }
                        >
                            FEEDBACK
                        </Link>
                    </li>
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
                            to=""
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
                            to=""
                            onClick={e =>
                                this.setState({ activePage: "feedback" })
                            }
                        >
                            FEEDBACK
                        </Link>
                    </li>
                </ul>
            </div>
        );
    }
}

export default Menu;
