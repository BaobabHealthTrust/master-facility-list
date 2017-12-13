import React, { Component } from 'react';
import logo from './logo.png';
import Menu from './Header/Menu';
import { Link } from 'react-router-dom';
import quickSearch from './actions/quick-search-facilities';
import { connect } from 'react-redux';

class Navbar extends Component {
    constructor() {
        super();
        this.state = {
            isSearchResultsContainer: false
        };
    }

    maximizeSearch(e) {
        document.getElementById('searchbar').className =
            'mfl-full-screen-search';
    }

    restoreSearch(e) {
        this.setState({
            isSearchResultsContainer: false
        });

        document.getElementById('searchbar').className =
            'left mfl-normal-search hide-on-small-only';
    }

    async handleQuickSearch(e) {
        if (e.key == 'Enter') {
            e.preventDefault();
            await this.props.quickSearch(e.target.value);
            this.setState(prevState => ({
                isSearchResultsContainer: !prevState.isSearchResultsContainer
            }));
            await console.log(this.props.searchResults);
        }
    }

    render() {
        return (
            <div>
                <nav>
                    <div className="nav-wrapper blue darken-4">
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
                                    onClick={e => this.maximizeSearch(e)}
                                    onBlur={e => this.restoreSearch(e)}
                                    onKeyPress={e => this.handleQuickSearch(e)}
                                />
                                <label class="label-icon" for="search">
                                    <i class="material-icons">search</i>
                                </label>
                                <i
                                    class="material-icons"
                                    onClick={e => this.restoreSearch(e)}
                                >
                                    close
                                </i>
                            </div>
                        </form>
                        <Menu />
                    </div>
                </nav>
                {this.state.isSearchResultsContainer ? (
                    <div className="mfl-search-results-container">
                        <div className="container">
                            <h5>Search Results</h5>
                            <ul>
                                {this.props.searchResults.map(result => {
                                    return <li>{result.facility_name}</li>;
                                })}
                            </ul>
                        </div>
                    </div>
                ) : (
                    <div />
                )}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        searchResults: state.searchResults.quickSearchFacilities
    };
};
export default connect(mapStateToProps, { quickSearch })(Navbar);
