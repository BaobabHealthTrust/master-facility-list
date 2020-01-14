import React from "react";
import {
  StyledModal,
  ModalContainer,
  ModalFooter
} from "./ChangePassword.styles";
import { Paper } from "@material-ui/core";
import Card from "../../../components/atoms/Card";
import ChangePasswordForm from "../../../components/organisms/UsersForms/ChangePasswordForm";
import Button from "../../../components/atoms/Button";

function ChangePasswordView(props: Props) {
  const { open, setOpen, handleSubmit, isSubmitting } = props;
  return (
    <StyledModal open={open}>
      <ModalContainer>
        <Paper>
          <Card
            style={{ minHeight: "300px" }}
            bodyStyle={{ marginBottom: "0px" }}
            heading="Change Password"
          >
            <ChangePasswordForm {...props} />{" "}
          </Card>
          <ModalFooter>
            <Button
              type="submit"
              onClick={handleSubmit}
              disabled={isSubmitting}
            >
              Save Password
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
  );
}

type Props = {
  open: boolean;
  setOpen: Function;
  handleSubmit: Function;
  isSubmitting: boolean;
};

export default ChangePasswordView;
