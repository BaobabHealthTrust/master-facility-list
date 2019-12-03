import React from "react";
import Button from "../../components/atoms/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faLock } from "@fortawesome/free-solid-svg-icons";
import {
  Container,
  LoginContainer,
  Title,
  NotificationContainer,
  Notification,
  InputContainer,
  StyledTextField,
  InputIconContainer
} from "./Login.styles";
import { Link } from "react-router-dom";

function LoginView(props: Props) {
  const {
    handleSubmit,
    values,
    handleChange,
    isSubmitting,
    errors,
    touched,
    error
  } = props;

  return (
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
            error={touched.username && typeof errors.username != "undefined"}
            name="username"
            placeholder="Enter Username"
            variant="outlined"
            value={values.username}
            onChange={handleChange as any}
          />
        </InputContainer>
        <InputContainer>
          <InputIconContainer>
            <FontAwesomeIcon style={{ margin: "auto" }} icon={faLock} />
          </InputIconContainer>
          <StyledTextField
            error={touched.password && typeof errors.password != "undefined"}
            name="password"
            placeholder="Enter Password"
            variant="outlined"
            type="password"
            value={values.password}
            onChange={handleChange as any}
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
  );
}

type Props = {
  handleSubmit: Function;
  values: any;
  handleChange: Function;
  isSubmitting: any;
  errors: any;
  error: string;
  touched: any;
};
export default LoginView;
