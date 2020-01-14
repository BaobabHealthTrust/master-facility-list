import React from "react";
import Button from "../../../components/atoms/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import AddForm from "../../../components/organisms/UsersForms/AddUserForm";
import { StyledModal, ModalContainer, ModalFooter } from "./UpdateUser.styles";
import { Paper } from "@material-ui/core";
import Card from "../../../components/atoms/Card";

function UpdateUserView(props: Props) {
  const { open, setOpen, handleSubmit, isSubmitting } = props;
  return (
    <>
      <Button
        data-test="updateUserBtn"
        icon={<FontAwesomeIcon icon={faEdit} />}
        onClick={() => {
          setOpen(true);
        }}
      >
        Update
      </Button>
      <StyledModal open={open}>
        <ModalContainer data-test="updateUserModal">
          <Paper>
            <Card
              style={{ minHeight: "300px" }}
              bodyStyle={{ marginBottom: "0px" }}
              heading="Update User"
            >
              <AddForm {...props} />{" "}
            </Card>
            <ModalFooter>
              <Button
                data-test="saveUserBtn"
                type="submit"
                onClick={handleSubmit}
                disabled={isSubmitting}
              >
                Save Changes
              </Button>
              <Button
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
  open: boolean;
  setOpen: Function;
  handleSubmit: Function;
  isSubmitting: boolean;
  errors?: any;
};

export default UpdateUserView;
