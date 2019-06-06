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

  defaultSearchIcon = `
    <i
      class="btn ml-4 mt-2  material-icons"
      style=
        "background-color: #94afd0;
        color: #496384;
        padding: 0 1.5rem"
  
    >
      search
    </i>
  `;

  maximizeSearch(e) {
    document.getElementById("searchbar").className = "mfl-full-screen-search";
    document.getElementById("searchLabelContainer").innerHTML = "";
  }

  restoreSearch(e) {
    setTimeout(() => {
      if (!this.state.isContainerClicked) {
        this.props.hideSearchContainer(true);

        document.getElementById("searchbar").className =
          "left hide-on-small-only mfl-normal-search";
        document.getElementById(
          "searchLabelContainer"
        ).innerHTML = this.defaultSearchIcon;
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
          <div
            className="nav-wrapper blue darken-4"
            style={{ fontSize: "28px" }}
          >
            <a href="/" className="center hide-on-med-and-up mfl-nav-title">
              MHFR
            </a>

            <div className="left hide-on-med-and-down mfl-pl-10">
              <a href="/">
                <img
                  src={logo}
                  alt="logo"
                  width="70"
                  style={{ padding: "5px" }}
                />
              </a>
            </div>

            <a
              href="#"
              data-activates="mobile-demo"
              className="button-collapse"
            >
              <i style={{ lineHeight: "inherit" }} className="material-icons">
                menu
              </i>
            </a>

            <div className="left hide-on-med-and-down mfl-nav-title">
              <a href="#">{`Master Health Facility Registry`.toUpperCase()}</a>
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
                  onKeyUp={debounce(this.handleQuickSearch, 1000)}
                />
                <label
                  id="searchLabelContainer"
                  className="label-icon"
                  htmlFor="search"
                >
                  <i
                    className="btn ml-4 mt-2  material-icons"
                    style={{
                      backgroundColor: "#94afd0",
                      color: "#496384",
                      padding: "0 1.5rem"
                    }}
                  >
                    search
                  </i>
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
          <div
            className="mfl-search-results-container"
            style={{ zIndex: "1300" }}
          >
            <div className="container">
              <h5 className="mt-8 mb-4">Search Results (Top 5)</h5>
              {this.props.searchResults.length === 0 && (
                <h6>No Results Match your Search...</h6>
              )}
              <Table
                onClick={e => this.setState({ isContainerClicked: true })}
                data={{
                  headers: [],
                  records: this.props.searchResults.slice(0, 5).map(result => {
                    return [
                      result.id,
                      result.code,
                      result.name,
                      result.district,
                      result.status
                    ];
                  })
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
export default connect(
  mapStateToProps,
  { quickSearch, hideSearchContainer }
)(Navbar);
