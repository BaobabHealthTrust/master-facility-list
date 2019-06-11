import React from "react";
import Button from "../../components/atoms/Button";
import { Modal, withStyles, Paper } from "@material-ui/core";
import Card from "../../components/atoms/Card";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";
import { updateSchema } from "../../components/organisms/UsersForms/schema";
import { userInitialValues } from "../../components/organisms/UsersForms/initialValues";
import AddForm from "../../components/organisms/UsersForms/AddUserForm";
import { Formik } from "formik";
import { updateUser, fetchUsers } from "../../services/redux/actions/users";
import { toast } from "react-toastify";
import Notification from "../../components/atoms/Notification";
import { connect } from "react-redux";

class SystemsModal extends React.Component<Props> {
  state = {
    open: true
  };

  setOpen = (open: boolean) => {
    this.setState({ open });
  };

  componentDidMount() {
    this.setState({ open: false });
  }

  onSubmit = (value: any, { setSubmitting, resetForm, setErrors }: any) => {
    let data = {
      ...value,
      firstname: value.name.split(" ")[0],
      lastname: value.name.split(" ").length > 0 ? value.name.split(" ")[1] : ""
    };

    let token = sessionStorage.getItem("token");
    this.props
      .updateUser(this.props.user.id, data, token)
      .then(() => {
        toast.info(<Notification message="User Updated Successfully!!!" />);
        this.props.fetchUsers(token);
        resetForm();
        this.setOpen(false);
      })
      .catch(() => {
        let errors = this.props.errors.addUser;
        setErrors({
          username: errors.username ? errors.username : "",
          email: errors.email ? errors.email : ""
        });
        toast.info(
          <Notification
            error
            message="Failed To Update User. Please Try Again"
          />
        );
      });
    setSubmitting(false);
  };

  render() {
    return (
      <React.Fragment>
        <Button
          icon={<FontAwesomeIcon icon={faEdit} />}
          onClick={() => {
            this.setOpen(true);
          }}
        >
          Update
        </Button>
        <StyledModal open={this.state.open}>
          <ModalContainer>
            <Paper>
              <Formik
                enableReinitialize={true}
                initialValues={userInitialValues(this.props.user)}
                validationSchema={updateSchema}
                onSubmit={this.onSubmit}
                render={(formikProps: any) => (
                  <>
                    <Card
                      style={{ minHeight: "300px" }}
                      bodyStyle={{ marginBottom: "0px" }}
                      heading="Update User"
                    >
                      <AddForm {...this.props} {...formikProps} />{" "}
                    </Card>
                    <ModalFooter>
                      <Button
                        type="submit"
                        onClick={formikProps.handleSubmit}
                        disabled={formikProps.isSubmitting}
                      >
                        Save Changes
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

const mapStateToProps = (state: any) => ({
  errors: state.errors.putUser
});
export default connect(
  mapStateToProps,
  { updateUser, fetchUsers }
)(SystemsModal);

type Props = {
  user: any;
  updateUser: Function;
  fetchUsers: Function;
  errors?: any;
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
  width: 800px;
  margin: auto;
`;

const ModalFooter = styled.div`
  padding: 20px;
  background: #eaeaea;
  text-align: right;
`;
