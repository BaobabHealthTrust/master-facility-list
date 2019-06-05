import React, { Component } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import { Paper } from "@material-ui/core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import SearchTable from "../../molecules/SearchResultsList";
// @ts-ignore
import { debounce } from "lodash";

export class SearchContainer extends Component<Props> {
  handleQuickSearch = () => {
    //  @ts-ignore
    this.props.onChange(this.refs.searchInput.value);
  };

  componentDidMount() {
    this.setState({ search: this.props.value });
  }

  filterFacilities = () => {
    return this.props.facilities.filter(
      facility =>
        facility.code.toLowerCase().includes(this.props.value.toLowerCase()) ||
        facility.name.toLowerCase().includes(this.props.value.toLowerCase())
    );
  };
  render() {
    const facilities = this.filterFacilities().slice(0, 5);
    return (
      <Container>
        <Paper style={{ height: "100%" }}>
          <SearchFormContainer>
            <SearchForm>
              {
                <Input
                  // @ts-ignore
                  ref="searchInput"
                  type="text"
                  name="search"
                  placeholder={
                    this.props.value
                      ? this.props.value
                      : "Enter Facility Name or Code"
                  }
                  onKeyUp={debounce(this.handleQuickSearch, 1000)}
                  autoFocus
                />
              }

              <CloseIcon onClick={e => this.props.onClose()}>
                <FontAwesomeIcon style={{ margin: "auto" }} icon={faTimes} />
              </CloseIcon>
            </SearchForm>
          </SearchFormContainer>
          <SearchResultsContainer>
            <SearchTable
              facilities={facilities}
              onClick={this.props.onClickSearchItem}
            />
          </SearchResultsContainer>
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
  height: 100%;
  width: 100vw;
  top: 0;
  left: 0;
  z-index: 1600;
  background: white;
  position: absolute;
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
  font-size: 24px;
  padding: 0px 5%;
`;
