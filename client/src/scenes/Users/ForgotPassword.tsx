import React from "react";
import styled from "styled-components";
import Button from "../../components/atoms/Button";
import { Formik } from "formik";
import * as yup from "yup";
import ForgotPasswordForm from "../../components/organisms/UsersForms/ForgotPasswordForm";

function Login(props: any) {
  //   const { error } = props;
  const initialValues: any = { email: null };
  const onSubmit = async (values: any, { setSubmitting }: any) => {
    console.log(values);
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
