import React, { Component } from "react";
import logo from "./logo.png";
import Menu from "./Header/Menu";
import { connect } from "react-redux";
import Table from "./common/Table";
import { debounce } from "lodash";
import { hideSearchContainer, quickSearch } from "./actions";

class Navbar extends Component {
  constructor() {
    super();
    this.state = {
      isSearchBarBlurred: false,
      isContainerClicked: false
    };
  }

  maximizeSearch(e) {
    document.getElementById("searchbar").className =
      "mfl-full-screen-search";
  }

  restoreSearch(e) {
    setTimeout(() => {
      if (!this.state.isContainerClicked) {
        this.props.hideSearchContainer(true);

        document.getElementById("searchbar").className =
          "left mfl-normal-search hide-on-small-only";
      }
    }, 100);
  }

  handleQuickSearch = () => {
    this.props.quickSearch(this.refs.searchInput.value);
    this.props.hideSearchContainer(false);
  };

  render() {
    return (
      <div className="header">
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
                  placeholder="Enter Facility Name or Facility Code"
                  required
                  onClick={e => this.maximizeSearch(e)}
                  onBlur={e => this.restoreSearch(e)}
                  ref="searchInput"
                  onKeyUp={debounce(
                    this.handleQuickSearch,
                    1000
                  )}
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
              <h5 className="mt-8 mb-4">Search Results (Top 5)</h5>
              {
                this.props.searchResults.length == 0 && <h6>No Results Match your Search...</h6>
              }
              <Table
                onClick={e =>
                  this.setState({ isContainerClicked: true })
                }
                data={{
                  headers: [],
                  records: this.props.searchResults.map(
                    result => {
                      return [
                        result.id,
                        result.code,
                        result.name,
                        result.district,
                        result.status
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
export default connect(mapStateToProps, { quickSearch, hideSearchContainer })(
  Navbar
);
