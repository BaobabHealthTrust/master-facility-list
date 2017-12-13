import React from 'react';
import { Link } from 'react-router-dom';

export default () => {
    return (
        <div>
            <ul
                id="nav-mobile"
                className="right mfl-pr-10 hide-on-med-and-down"
            >
                <li>
                    <Link to="/">HOME</Link>
                </li>
                <li>
                    <a href="#">ABOUT</a>
                </li>
                <li className="active">
                    <Link to="/facilities">FACILITIES</Link>
                </li>
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
};
