import React from "react";
import Button from "../../components/atoms/Button";
import { Modal, withStyles, Paper } from "@material-ui/core";
import Card from "../../components/atoms/Card";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";
import { userSchema } from "../../components/organisms/UsersForms/schema";
import { userInitialValues } from "../../components/organisms/UsersForms/initialValues";
import AddForm from "../../components/organisms/UsersForms/AddUserForm";
import { Formik } from "formik";

class SystemsModal extends React.Component {
  state = {
    open: true
  };

  setOpen = (open: boolean) => {
    this.setState({ open });
  };

  componentDidMount() {
    this.setState({ open: false });
  }

  onSubmit = (value: any, { setSubmitting }: any) => {
    console.log(value);
    setSubmitting(false);
  };

  render() {
    return (
      <React.Fragment>
        <Button
          icon={<FontAwesomeIcon icon={faPlusCircle} />}
          onClick={() => {
            this.setOpen(true);
          }}
        >
          Add New User
        </Button>
        <StyledModal open={this.state.open}>
          <ModalContainer>
            <Paper>
              <Formik
                enableReinitialize={true}
                initialValues={userInitialValues()}
                validationSchema={userSchema}
                onSubmit={this.onSubmit}
                render={(formikProps: any) => (
                  <>
                    <Card
                      style={{ minHeight: "300px" }}
                      bodyStyle={{ marginBottom: "0px" }}
                      heading="Add New User"
                    >
                      <AddForm {...this.props} {...formikProps} />{" "}
                    </Card>
                    <ModalFooter>
                      <Button
                        type="submit"
                        onClick={formikProps.handleSubmit}
                        disabled={formikProps.isSubmitting}
                      >
                        Add User
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
                  </>
                )}
              />
            </Paper>
          </ModalContainer>
        </StyledModal>
      </React.Fragment>
    );
  }
}
export default SystemsModal;

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
  width: 800px;
  margin: auto;
`;

const ModalFooter = styled.div`
  padding: 20px;
  background: #eaeaea;
  text-align: right;
`;
