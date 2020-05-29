import React from "react";
import { Form, FormControl, Button } from "react-bootstrap";
import PropTypes from "prop-types";

function SearchForm(props) {
  return (
    <React.Fragment>
      <Form className="nav-search-form" inline onSubmit={props.onSearch}>
        <FormControl
          type="text"
          placeholder="Search..."
          className="mr-sm-2"
          onChange={props.onInputChange}
        />
        <Button hidden type="submit" />
      </Form>
    </React.Fragment>
  );
}

SearchForm.propTypes = {
  onSearch: PropTypes.func.isRequired,
  onInputChange: PropTypes.func.isRequired,
};

export default SearchForm;
