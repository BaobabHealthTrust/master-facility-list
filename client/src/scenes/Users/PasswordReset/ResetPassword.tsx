import React, { useState } from "react";
import styled from "styled-components";
import Button from "../../../components/atoms/Button";
import { Formik } from "formik";
import * as yup from "yup";
import ResetPasswordForm from "../../../components/organisms/UsersForms/ResetPasswordForm";
import { resetPasswordSchema } from "../../../components/organisms/UsersForms/schema";
import { Link } from "react-router-dom";

function Login(props: Props) {
  const { history } = props;
  const initialValues: any = { newPassword: null, confirmNewPassword: null };

  const [message, setMessage] = useState({ type: "error", msg: "" });

  const onSubmit = async (values: any, { setSubmitting, setErrors }: any) => {
    const path = history.location.pathname.split("/");
    const token = path[path.length - 1];
    const { newPassword } = values;
    props
      .passwordReset({ newPassword }, token)
      .then(() => {
        setMessage({
          type: "success",
          msg: "Password reset successfully."
        });
      })
      .catch(() => {
        setMessage({
          type: "error",
          msg: "Token expired."
        });
      });
    setSubmitting(false);
  };

  return (
    <Formik
      onSubmit={onSubmit}
      initialValues={initialValues}
      validationSchema={resetPasswordSchema}
      render={formikProps => (
        <Container>
          <LoginContainer>
            <Title>Password Reset</Title>
            <ResetPasswordForm {...formikProps} />
            {/* TODO: make a compnent */}
            <div>
              {`${message.msg}`}{" "}
              {message.type === "success" && <Link to="/login"> Login</Link>}
            </div>
            <Button
              disabled={formikProps.isSubmitting}
              type="submit"
              theme="secondary"
              style={{
                margin: "15px 0px",
                padding: "15px 0px",
                height: "auto",
                fontSize: "20px"
              }}
              onClick={formikProps.handleSubmit}
            >
              Reset Password
            </Button>
          </LoginContainer>
        </Container>
      )}
    />
  );
}

export default Login;

type Props = {
  history: any;
  passwordReset: Function;
};
const Container = styled.div`
  display: flex;
  align-content: center;
  align-items: center;
`;
const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100%;
  width: 40%;
  margin: 10% auto;
  padding: 30px;
  border-top: 6px solid #82b1ff;
  box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.2),
    0px 1px 1px 0px rgba(0, 0, 0, 0.14), 0px 2px 1px -1px rgba(0, 0, 0, 0.12);
  background-color: white;
`;

const Title = styled.h3`
  font-size: 26px;
`;

const NotificationContainer = styled.div`
  height: 40px;
  display: flex;
  align-items: center;
`;
