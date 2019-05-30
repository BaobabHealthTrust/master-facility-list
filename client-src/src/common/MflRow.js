import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const Row = styled.div.attrs({
  className: "lex flex-row w-full justify-between mb-5"
});
function MflRow() {
  return <Row />;
}

export default MflRow;
