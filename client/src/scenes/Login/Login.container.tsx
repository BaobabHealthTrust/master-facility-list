import React, { useState, useEffect } from "react";
import { LoginSchema } from "./Login.schema";
import { Formik } from "formik";
import LoginView from "./Login.view";

function LoginContainer(props: Props) {
  const { userLogin, fetchUserDetails, setActivePage, auth, history } = props;
  const [error, setError] = useState("");
  const [logged, setLogged] = useState(false);
  const initialValues: any = { username: null, password: null };

  useEffect(() => {
    if (logged) {
      fetchUserDetails(auth.authDetails.userId, auth.authDetails.id);

      persistUserDetails(auth.authDetails);

      history.push("/");
      setActivePage("home");
    }
  }, [logged]);

  const onSubmit = async (values: any, { setSubmitting }: any) => {
    await attemptLogin(values);
    setSubmitting(false);
  };

  const attemptLogin = async (values: {
    username: string;
    password: string;
  }) => {
    setError("");
    const log = await userLogin(values).catch((error: any) => {
      return false;
    });
    if (!log) {
      setError("Invalid username or password");
      return;
    }
    setLogged(true);
  };

  const persistUserDetails = async (details: any) => {
    await sessionStorage.setItem("token", details.id);
    await sessionStorage.setItem(
      "user",
      JSON.stringify({ ...auth.details, role: details.role })
    );
  };
  return (
    <Formik
      onSubmit={onSubmit}
      initialValues={initialValues}
      validationSchema={LoginSchema}
      render={formikProps => (
        <LoginView {...(formikProps as any)} error={error} />
      )}
    />
  );
}

type Props = {
  userLogin: Function;
  fetchUserDetails: Function;
  setActivePage: Function;
  auth: any;
  history: any;
};
export default LoginContainer;
