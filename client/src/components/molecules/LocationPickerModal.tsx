import React from "react";
import Button from "../../components/atoms/Button";
import { Modal, withStyles, Paper } from "@material-ui/core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";
import Card from "../atoms/Card";
import LocationPicker from "../atoms/LocationPicker";

class SystemsModal extends React.Component<Props> {
  state = {
    open: true,
    position: { lat: -13.2512161, lng: 34.3015278 }
  };

  onChange = (position: any) => {
    this.setState({ position });
  };

  setOpen = (open: boolean) => {
    this.setState({ open });
  };

  componentDidMount() {
    this.setState({ open: false });
  }

  onSave = () => {
    this.props.onSave(this.state.position);
    this.setOpen(false);
  };
  render() {
    return (
      <React.Fragment>
        <Button
          theme="success"
          onClick={() => {
            this.setOpen(true);
          }}
        >
          or Select Geolocation
        </Button>
        <StyledModal open={this.state.open}>
          <ModalContainer>
            <Paper>
              <Card
                style={{ minHeight: "300px" }}
                bodyStyle={{ marginBottom: "0px", padding: "0px" }}
                heading="Pick Location"
              >
                <LocationPicker
                  position={{ lat: -13.2512161, lng: 34.3015278 }}
                  isMarkerShown
                  onChange={this.onChange}
                />
              </Card>
              <ModalFooter>
                <Button type="submit" onClick={this.onSave}>
                  Select This Location
                </Button>
                <Button
                  theme="default"
                  onClick={() => {
                    this.setOpen(false);
                  }}
                >
                  Or Cancel
                </Button>
              </ModalFooter>
            </Paper>
          </ModalContainer>
        </StyledModal>
      </React.Fragment>
    );
  }
}

export default SystemsModal;

type Props = {
  onSave: Function;
};
const StyledModal = withStyles({
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

const ModalContainer = styled.div`
  width: 1000px;
  margin: auto;
`;

const ModalFooter = styled.div`
  padding: 20px;
  background: #eaeaea;
  text-align: right;
`;
