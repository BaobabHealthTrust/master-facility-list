import React from 'react';
import logo from './logo.png';
import { Link } from 'react-router-dom';

const maximizeSearch = e => {
    document.getElementById('searchbar').className = 'mfl-full-screen-search';
};
const restoreSearch = e => {
    document.getElementById('searchbar').className =
        'left mfl-normal-search hide-on-small-only';
};

const Navbar = () => {
    return (
        <nav>
            <div className="nav-wrapper grey darken-3">
                <a href="#" className="center hide-on-med-and-up">
                    Master Health Facility Register
                </a>

                <div className="left hide-on-med-and-down mfl-pl-10">
                    <img src={logo} alt="logo" width="60" />
                </div>

                <a
                    href="#"
                    data-activates="mobile-demo"
                    class="button-collapse"
                >
                    <i class="material-icons">menu</i>
                </a>

                <div className="left hide-on-med-and-down mfl-pl-2">
                    Master Health Facility Register
                </div>

                <form
                    className="left hide-on-small-only mfl-normal-search"
                    id="searchbar"
                >
                    <div class="input-field">
                        <input
                            id="search"
                            type="search"
                            required
                            onClick={e => maximizeSearch(e)}
                        />
                        <label class="label-icon" for="search">
                            <i class="material-icons">search</i>
                        </label>
                        <i
                            class="material-icons"
                            onClick={e => restoreSearch(e)}
                        >
                            close
                        </i>
                    </div>
                </form>

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
        </nav>
    );
};
export default Navbar;
