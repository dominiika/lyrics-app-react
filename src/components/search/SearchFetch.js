import React, { Component, Fragment } from "react";
import SearchForm from "./SearchForm";
import SearchModal from "./SearchModal";

class SearchFetch extends Component {
  state = {
    value: "",
    results: {},
    showModal: false,
    currentPage: 1,
  };

  handleInputChange = (event) => {
    this.setState({ value: event.target.value });
  };

  handleToggleShow = () => {
    this.setState({ showModal: !this.state.showModal });
    if (!this.state.showModal) {
      this.setState({ value: "", currentPage: 1 });
    }
  };

  handlePaginate = (number) => {
    console.log("number", number);
    this.setState({ currentPage: number });
    console.log("currentPage", this.state.currentPage);
    this.handleSearch(number);
  };

  handlePreventRefreshAndSearch = (event) => {
    event.preventDefault();
    this.handleSearch(this.state.currentPage);
  };

  handleSearch = (pageNumber) => {
    fetch(
      `${process.env.REACT_APP_API_URL}/api/search/all/?value=${this.state.value}&page_number=${pageNumber}`,
      {
        method: "GET",
      }
    )
      .then((resp) => resp.json())
      .then((res) => {
        this.setState({ results: res });
        this.setState({ showModal: true });
      })
      .catch((error) => console.log(error));
  };

  render() {
    return (
      <Fragment>
        <SearchForm
          onSearch={this.handlePreventRefreshAndSearch}
          onInputChange={this.handleInputChange}
        />

        {this.state.showModal && (
          <SearchModal
            results={this.state.results}
            show={this.state.showModal}
            onToggleShow={this.handleToggleShow}
            currentPage={this.state.currentPage}
            onPaginate={this.handlePaginate}
          />
        )}
      </Fragment>
    );
  }
}

export default SearchFetch;
