import React, { Component } from 'react';
import logo from './logo.png';
import Menu from './Header/Menu';
import { Link } from 'react-router-dom';
import quickSearch from './actions/quick-search-facilities';
import { connect } from 'react-redux';
import Table from './common/Table';
import hideSearchContainer from './actions/hide-search-container';

class Navbar extends Component {
    constructor() {
        super();
        this.state = {
            isSearchBarBlurred: false,
        };
    }

    maximizeSearch(e) {
        document.getElementById('searchbar').className =
            'mfl-full-screen-search';
    }

    restoreSearch(e) {
        // this.props.hideSearchContainer(true);

        document.getElementById('searchbar').className =
            'left mfl-normal-search hide-on-small-only';
    }

    handleQuickSearch(e) {
        if (e.key == 'Enter') {
            this.setState({
                isSearchBarBlurred: false
            })
            e.preventDefault();
            this.props.quickSearch(e.target.value);
            this.props.hideSearchContainer(false);
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
                {!this.props.isSearchContainerHidden ? (
                    <div className="mfl-search-results-container">
                        <div className="container">
                            <h5>Search Results</h5>
                            <Table
                                data={{
                                    headers: [],
                                    records: this.props.searchResults.map(
                                        result => {
                                            return [
                                                result.id,
                                                result.facility_code,
                                                result.facility_name
                                            ];
                                        }
                                    )
                                }}
                            />
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
        searchResults: state.searchResults.quickSearchFacilities,
        isSearchContainerHidden: state.globalContainers.isSearchContainerHidden
    };
};
export default connect(mapStateToProps, { quickSearch, hideSearchContainer })(Navbar);
