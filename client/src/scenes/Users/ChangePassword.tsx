import React, { useState, useEffect } from "react";
import Button from "../../components/atoms/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLink, faMinus } from "@fortawesome/free-solid-svg-icons";
import { Modal, withStyles, Paper, Grid, TextField } from "@material-ui/core";
import styled from "styled-components";
import Card from "../../components/atoms/Card";
import { Formik } from "formik";
import { changePasswordSchema } from "../../components/organisms/UsersForms/schema";
import ChangePasswordForm from "../../components/organisms/UsersForms/ChangePasswordForm";

function ChangePassword(props: Props) {
  const { open, setOpen, onSubmit } = props;
  const initialValues = {
    oldPassword: null,
    newPassword: null,
    confirmNewPassword: null
  };
  return (
    <>
      <StyledModal open={open}>
        <ModalContainer>
          <Paper>
            <Formik
              enableReinitialize={true}
              initialValues={initialValues}
              validationSchema={changePasswordSchema}
              onSubmit={onSubmit}
              render={(formikProps: any) => (
                <>
                  <Card
                    style={{ minHeight: "300px" }}
                    bodyStyle={{ marginBottom: "0px" }}
                    heading="Change Password"
                  >
                    <ChangePasswordForm {...props} {...formikProps} />{" "}
                  </Card>
                  <ModalFooter>
                    <Button
                      type="submit"
                      onClick={formikProps.handleSubmit}
                      disabled={formikProps.isSubmitting}
                    >
                      Change Password
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
                </>
              )}
            />
          </Paper>
        </ModalContainer>
      </StyledModal>
    </>
  );
}

export default ChangePassword;

type Props = {
  open: boolean;
  setOpen: Function;
  onSubmit: any;
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
