import React, { useState } from "react";
import styled from "styled-components";
import Button from "../../../components/atoms/Button";
import { Formik } from "formik";
import * as yup from "yup";
import ForgotPasswordForm from "../../../components/organisms/UsersForms/ForgotPasswordForm";

function Login(props: Props) {
  const initialValues: any = { email: null };
  const [message, setMessage] = useState({ type: "success", msg: "" });

  const onSubmit = async (values: any, { setSubmitting, setErrors }: any) => {
    props
      .requestPasswordReset(values)
      .then(() => {
        setMessage({
          type: "success",
          msg: "Check your mail box for the reset link"
        });
      })
      .catch(() => {
        setErrors({ email: "Invalid email address" });
      });
    setSubmitting(false);
  };

  const schema: yup.ObjectSchema<any> = yup.object().shape({
    email: yup
      .string()
      .required()
      .email("Invalid email address")
  });

  return (
    <Formik
      onSubmit={onSubmit}
      initialValues={initialValues}
      validationSchema={schema}
      render={formikProps => (
        <Container>
          <LoginContainer>
            <Title>Password Recovery</Title>
            Enter Your Email below to recover your password.
            <ForgotPasswordForm {...formikProps} />
            <Message type={message.type as any}>{message.msg}</Message>
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
              Send Reset Request
            </Button>
          </LoginContainer>
        </Container>
      )}
    />
  );
}
type Props = {
  history: any;
  requestPasswordReset: Function;
};

export default Login;

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

const Message = styled("div")<{ type: "error" | "success" }>`
  color: ${props => (props.type === "error" ? "red" : "#0d47a1")};
  padding: 2px 10px;
`;
