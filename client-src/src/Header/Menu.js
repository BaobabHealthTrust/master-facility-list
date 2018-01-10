import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Menu extends Component {
    constructor() {
        super();
        this.state = {
            activePage: null
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

                    <li>
                        <a href="#">ABOUT</a>
                    </li>
                    {
                        this.state.activePage === "facilities" ? (
                            <li className="active">
                                <Link to="/facilities" onClick={(e) => this.setState({ activePage: "facilities" })}>FACILITIES</Link>
                            </li>) : (
                                <li>
                                    <Link to="/facilities" onClick={(e) => this.setState({ activePage: "facilities" })}>FACILITIES</Link>
                                </li>)
                    }
                    <li>
                        <a href="#">FEEDBACK</a>
                    </li>
                    <li>
                        <a href="#">CONTACTS</a>
                    </li>
                </ul>
                <ul class="side-nav" id="mobile-demo">
                    <li>
                        <a href="#">HOME</a>
                    </li>
                    <li>
                        <a href="#">ABOUT</a>
                    </li>
                    <li>
                        <a href="#">FACILITIES</a>
                    </li>
                    <li>
                        <a href="#">FEEDBACK</a>
                    </li>
                    <li>
                        <a href="#">CONTACTS</a>
                    </li>
                </ul>
            </div>
        );
    }
}

export default Menu;
