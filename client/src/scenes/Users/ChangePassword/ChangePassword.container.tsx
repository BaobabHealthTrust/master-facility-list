import React, { useState } from "react";
import ChangePasswordView from "./ChangePassword.view";
import { changePasswordSchema } from "../../../components/organisms/UsersForms/schema";
import { Formik } from "formik";

function ChangePasswordContainer(props: Props) {
  const { open, setOpen } = props;

  const initialValues = {
    oldPassword: null,
    newPassword: null,
    confirmNewPassword: null
  };

  //   TODO: hit the API
  const onPasswordChange = (
    value: any,
    { setSubmitting, setErrors, resetForm }: any
  ) => {
    console.log(value);
  };
  return (
    <Formik
      enableReinitialize={true}
      initialValues={initialValues}
      validationSchema={changePasswordSchema}
      onSubmit={onPasswordChange}
      render={(formikProps: any) => (
        <ChangePasswordView open={open} setOpen={setOpen} {...formikProps} />
      )}
    />
  );
}

type Props = {
  open: boolean;
  setOpen: Function;
};

export default ChangePasswordContainer;
