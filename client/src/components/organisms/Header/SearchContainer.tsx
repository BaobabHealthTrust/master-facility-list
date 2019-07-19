import React, { Component } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import { Paper } from "@material-ui/core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import SearchTable from "../../molecules/SearchResultsList";

export class SearchContainer extends Component<Props> {
  state = {
    search: ""
  };
  handleQuickSearch = (e: any) => {
    this.props.onChange(e.target.value);
    this.setState({ search: e.target.value });
  };

  componentDidMount() {
    this.setState({ search: this.props.value });
  }

  filterFacilities = () => {
    return this.props.facilities.filter(facility =>
      JSON.stringify(facility)
        .toLowerCase()
        .includes(this.props.value.toLowerCase())
    );
  };
  render() {
    const facilities =
      this.props.value.length == 0 ? [] : this.filterFacilities().slice(0, 5);
    return (
      <Container>
        <Paper style={{ height: "100%" }}>
          <SearchFormContainer>
            <SearchForm>
              {
                <Input
                  value={this.state.search}
                  // @ts-ignore
                  ref="searchInput"
                  type="text"
                  name="search"
                  placeholder={
                    this.props.value
                      ? this.props.value
                      : "Enter Facility Name or Code"
                  }
                  onChange={e => this.handleQuickSearch(e)}
                  autoFocus
                />
              }

              <CloseIcon onClick={e => this.props.onClose()}>
                <FontAwesomeIcon style={{ margin: "auto" }} icon={faTimes} />
              </CloseIcon>
            </SearchForm>
          </SearchFormContainer>
          {this.props.value.length > 0 && (
            <SearchResultsContainer data-test="quickSearchContainer">
              {facilities.length == 0 && this.props.value.length > 0 ? (
                "No results for search"
              ) : (
                <SearchTable
                  facilities={facilities}
                  onClick={this.props.onClickSearchItem}
                />
              )}
            </SearchResultsContainer>
          )}
        </Paper>
      </Container>
    );
  }
}

const mapStateToProps = (state: any) => ({
  facilities: state.facilities.list,
  value: state.facilities.quickSearchValue
});
export default connect(mapStateToProps)(SearchContainer);

type Props = {
  facilities: Array<any>;
  onClickSearchItem: Function;
  onChange: Function;
  value: any;
  onClose: Function;
};
const SearchFormContainer = styled.div`
  height: 100%;
  display: flex;
`;

const SearchForm = styled.form`
  height: 100%;
  width: 100%;
`;
const SearchResultsContainer = styled.div`
  background: white;
  padding: 10px 15%;
  color: black;
  width: 100%;
  border-top: 1px solid #ededed;
  font-size: 16px;
`;
const Container = styled.div`
  height: 80px;
  width: 100vw;
  top: 0;
  left: 0;
  z-index: 1400;
  background: white;
  position: fixed;
  color: black;
`;

const CloseIcon = styled.div`
  display: inline-flex;
  width: 10%;
  color: gray;
  font-size: 26px;
  cursor: pointer;
`;

const Input = styled.input`
  height: 100%;
  width: 90%;
  font-size: 22px;
  padding: 0px 5%;
  @media screen and (max-width: 800px) {
    font-size: 20px;
  }
`;
