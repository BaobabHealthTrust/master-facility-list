import { Modal, withStyles, Paper } from "@material-ui/core";
import styled from "styled-components";

export const StyledModal = withStyles({
  root: {
    zIndex: 1500,
    display: "flex",
    alignContent: "center",
    alignItems: "center",
    "& :active": {
      outline: "none"
    }
  }
})(Modal);

export const ModalContainer = styled.div`
  width: 800px;
  margin: auto;
`;

export const ModalFooter = styled.div`
  padding: 20px;
  background: #eaeaea;
  text-align: right;
`;
