import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Menu extends Component {
    constructor() {
        super();
        this.state = {
            activePage: "home"
        }
    }

    render() {
        return (
            <div>
                <ul
                    id="nav-mobile"
                    className="right mfl-pr-10 hide-on-med-and-down"
                >
                    {
                        this.state.activePage === "home" ? (
                            <li className="active">
                                <Link to="/" onClick={(e) => this.setState({ activePage: "home" })}>HOME</Link>
                            </li>) : (
                                <li>
                                    <Link to="/" onClick={(e) => this.setState({ activePage: "home" })}>HOME</Link>
                                </li>)
                    }
                    {
                        this.state.activePage === "about" ? (
                            <li className="active">
                                <Link to="" onClick={(e) => this.setState({ activePage: "about" })}>ABOUT</Link>
                            </li>) : (
                                <li>
                                    <Link to="" onClick={(e) => this.setState({ activePage: "about" })}>ABOUT</Link>
                                </li>)
                    }

                    {
                        this.state.activePage === "facilities" ? (
                            <li className="active">
                                <Link to="/facilities" onClick={(e) => this.setState({ activePage: "facilities" })}>FACILITIES</Link>
                            </li>) : (
                                <li>
                                    <Link to="/facilities" onClick={(e) => this.setState({ activePage: "facilities" })}>FACILITIES</Link>
                                </li>)
                    }
                    {
                        this.state.activePage === "feedback" ? (
                            <li className="active">
                                <Link to="" onClick={(e) => this.setState({ activePage: "feedback" })}>FEEDBACK</Link>
                            </li>) : (
                                <li>
                                    <Link to="" onClick={(e) => this.setState({ activePage: "feedback" })}>FEEDBACK</Link>
                                </li>)
                    }
                    {
                        this.state.activePage === "contacts" ? (
                            <li className="active">
                                <Link to="" onClick={(e) => this.setState({ activePage: "contacts" })}>CONTACTS</Link>
                            </li>) : (
                                <li>
                                    <Link to="" onClick={(e) => this.setState({ activePage: "contacts" })}>CONTACTS</Link>
                                </li>)
                    }
                </ul>
                <ul class="side-nav" id="mobile-demo">
                {
                    this.state.activePage === "home" ? (
                        <li className="active">
                            <Link to="/" onClick={(e) => this.setState({ activePage: "home" })}>HOME</Link>
                        </li>) : (
                            <li>
                                <Link to="/" onClick={(e) => this.setState({ activePage: "home" })}>HOME</Link>
                            </li>)
                }
                {
                    this.state.activePage === "about" ? (
                        <li className="active">
                            <Link to="" onClick={(e) => this.setState({ activePage: "about" })}>ABOUT</Link>
                        </li>) : (
                            <li>
                                <Link to="" onClick={(e) => this.setState({ activePage: "about" })}>ABOUT</Link>
                            </li>)
                }

                {
                    this.state.activePage === "facilities" ? (
                        <li className="active">
                            <Link to="/facilities" onClick={(e) => this.setState({ activePage: "facilities" })}>FACILITIES</Link>
                        </li>) : (
                            <li>
                                <Link to="/facilities" onClick={(e) => this.setState({ activePage: "facilities" })}>FACILITIES</Link>
                            </li>)
                }
                {
                    this.state.activePage === "feedback" ? (
                        <li className="active">
                            <Link to="" onClick={(e) => this.setState({ activePage: "feedback" })}>FEEDBACK</Link>
                        </li>) : (
                            <li>
                                <Link to="" onClick={(e) => this.setState({ activePage: "feedback" })}>FEEDBACK</Link>
                            </li>)
                }
                {
                    this.state.activePage === "contacts" ? (
                        <li className="active">
                            <Link to="" onClick={(e) => this.setState({ activePage: "contacts" })}>CONTACTS</Link>
                        </li>) : (
                            <li>
                                <Link to="" onClick={(e) => this.setState({ activePage: "contacts" })}>CONTACTS</Link>
                            </li>)
                }
                </ul>
            </div>
        );
    }
}

export default Menu;
