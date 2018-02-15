import React, { Component } from 'react';
import logo from './logo.png';
import Menu from './Header/Menu';
import quickSearch from './actions/quick-search-facilities';
import { connect } from 'react-redux';
import Table from './common/Table';
import { debounce } from "lodash";
import hideSearchContainer from './actions/hide-search-container';

class Navbar extends Component {
    constructor() {
        super();
        this.state = {
            isSearchBarBlurred: false,
            searchInput: ""
        };
    }

    maximizeSearch(e) {
        document.getElementById('searchbar').className =
            'mfl-full-screen-search';
    }

    restoreSearch(e) {
        this.props.hideSearchContainer(true);

        document.getElementById('searchbar').className =
            'left mfl-normal-search hide-on-small-only';
    }

    handleQuickSearch = () => {
        this.props.quickSearch(this.refs.searchInput.value);
        this.props.hideSearchContainer(false);
    }

    render() {
        return (
            <div>
                <nav>
                    <div className="nav-wrapper blue darken-4">
                        <a href="" className="center hide-on-med-and-up">
                            Master Health Facility Register
                        </a>

                        <div className="left hide-on-med-and-down mfl-pl-10">
                            <img src={logo} alt="logo" width="60" />
                        </div>

                        <a
                            href=""
                            data-activates="mobile-demo"
                            className="button-collapse"
                        >
                            <i className="material-icons">menu</i>
                        </a>

                        <div className="left hide-on-med-and-down mfl-pl-2">
                            Master Health Facility Register
                        </div>

                        <form
                            className="left hide-on-small-only mfl-normal-search"
                            id="searchbar"
                        >
                            <div className="input-field">
                                <input
                                    id="search"
                                    type="search"
                                    required
                                    onClick={e => this.maximizeSearch(e)}

                                    // onBlur={e => this.restoreSearch(e)}
                                    ref="searchInput"
                                    onKeyUp={debounce(this.handleQuickSearch, 1000)}
                                />
                                <label className="label-icon" for="search">
                                    <i className="material-icons">search</i>
                                </label>
                                <i
                                    className="material-icons"
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
