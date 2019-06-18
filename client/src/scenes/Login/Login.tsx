import React from "react";
import styled from "styled-components";
import { TextField, withStyles } from "@material-ui/core";
import Button from "../../components/atoms/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faLock } from "@fortawesome/free-solid-svg-icons";
import { Formik } from "formik";
import * as yup from "yup";
import { Link } from "react-router-dom";

function Login(props: Props) {
  const { error } = props;
  const initialValues: any = { username: null, password: null };
  const onSubmit = async (values: any, { setSubmitting }: any) => {
    await props.onSubmit(values);
    setSubmitting(false);
  };

  const schema: yup.ObjectSchema<any> = yup.object().shape({
    username: yup.string().required(),
    password: yup.string().required()
  });
  return (
    <Formik
      onSubmit={onSubmit}
      initialValues={initialValues}
      validationSchema={schema}
      render={({
        handleSubmit,
        values,
        handleChange,
        isSubmitting,
        errors,
        touched
      }) => (
        <Container>
          <LoginContainer>
            <Title>
              <FontAwesomeIcon icon={faLock} style={{ marginRight: "10px" }} />{" "}
              Login Here
            </Title>
            <NotificationContainer>
              {error.length > 0 && <Notification warning>{error}</Notification>}
            </NotificationContainer>
            <InputContainer>
              <InputIconContainer>
                <FontAwesomeIcon style={{ margin: "auto" }} icon={faUser} />
              </InputIconContainer>
              <StyledTextField
                error={
                  touched.username && typeof errors.username != "undefined"
                }
                name="username"
                placeholder="Enter Username"
                variant="outlined"
                value={values.username}
                onChange={handleChange}
              />
            </InputContainer>
            <InputContainer>
              <InputIconContainer>
                <FontAwesomeIcon style={{ margin: "auto" }} icon={faLock} />
              </InputIconContainer>
              <StyledTextField
                error={
                  touched.password && typeof errors.password != "undefined"
                }
                name="password"
                placeholder="Enter Password"
                variant="outlined"
                type="password"
                value={values.password}
                onChange={handleChange}
              />
            </InputContainer>
            <Button
              disabled={isSubmitting}
              type="submit"
              theme="secondary"
              style={{
                margin: "15px 0px",
                padding: "15px 0px",
                height: "auto",
                fontSize: "20px"
              }}
              onClick={handleSubmit}
            >
              Login
            </Button>
            <Link to="/forgotPassword" style={{ color: "white" }}>
              Forgot Password?
            </Link>
          </LoginContainer>
        </Container>
      )}
    />
  );
}

export default Login;

type Props = {
  onSubmit: Function;
  error: string;
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
  border-left: 6px solid #82b1ff;
  border-right: 6px solid #82b1ff;
  background-color: #0d47a1;
`;

const Title = styled.h3`
  color: white;
  font-size: 26px;
`;
const StyledTextField = withStyles({
  root: {
    background: "white",
    borderRadius: "0px 4px 4px 0px",
    margin: "6px 0px",
    width: "100%",
    "& fieldset": {
      borderRadius: "0px 4px 4px 0px !important"
    },
    "&:hover fieldset": {
      borderColor: "gray !important"
    },
    "&.Mui-focused fieldset": {
      borderColor: "gray !important"
    }
  }
})(TextField);

const InputContainer = styled.div`
  display: flex;
`;

const InputIconContainer = styled.div`
  background: #f3f3f3;
  color: gray;
  width: 15%;
  margin: 6px 0px;
  display: flex;
  align-content: center;
  align-items: center;
  font-size: 26px;
  border-radius: 4px 0px 0px 4px;
`;

const Notification = styled<any>("div")`
  display: flex;
  justify-content: space-between;
  width: 100%;
  border-radius: 4px;
  padding: 0.3rem;
  font-size: 1rem;
  background-color: ${props => (props.warning ? "khaki" : "powderblue")};
  color: ${props => (props.warning ? "olive" : "midnightblue")};
  i {
    cursor: pointer;
  }
`;

const NotificationContainer = styled.div`
  height: 40px;
  display: flex;
  align-items: center;
`;
