import React from "react";
import Button from "../../../components/atoms/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import { StyledModal, ModalContainer, ModalFooter } from "./CreateUser.styles";
import { Paper } from "@material-ui/core";
import Card from "../../../components/atoms/Card";
import AddForm from "../../../components/organisms/UsersForms/AddUserForm";

function CreateUserView(props: Props) {
  const { open, setOpen, handleSubmit, isSubmitting } = props;
  return (
    <>
      <Button
        data-test="addUserButton"
        icon={<FontAwesomeIcon icon={faPlusCircle} />}
        onClick={() => {
          setOpen(true);
        }}
      >
        Add New User
      </Button>
      <StyledModal open={open}>
        <ModalContainer data-test="addUserModal">
          <Paper>
            <Card
              style={{ minHeight: "300px" }}
              bodyStyle={{ marginBottom: "0px" }}
              heading="Add New User"
            >
              <AddForm {...props} fromAdd />{" "}
            </Card>
            <ModalFooter data-test="modalFooter">
              <Button
                type="submit"
                onClick={handleSubmit}
                disabled={isSubmitting}
                data-test="addUserButton1"
              >
                Add User
              </Button>
              <Button
                data-test="cancelDataTest"
                theme="default"
                onClick={() => {
                  setOpen(false);
                }}
              >
                Or Cancel
              </Button>
            </ModalFooter>
          </Paper>
        </ModalContainer>
      </StyledModal>
    </>
  );
}

type Props = {
  handleSubmit: Function;
  isSubmitting: boolean;
  open: boolean;
  setOpen: Function;
  roles: Array<any>;
  errors?: any;
};
export default CreateUserView;
