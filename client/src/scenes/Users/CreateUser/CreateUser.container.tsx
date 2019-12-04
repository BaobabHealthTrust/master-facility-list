import React, { useState } from "react";
import { Formik } from "formik";
import { userSchema } from "../../../components/organisms/UsersForms/schema";
import { userInitialValues } from "../../../components/organisms/UsersForms/initialValues";
import Notification from "../../../components/atoms/Notification";
import { toast } from "react-toastify";
import CreateUserView from "./CreateUser.view";

function CreateUserContainer(props: Props) {
  const [open, setOpen] = useState(false);

  const onSubmit = (
    value: any,
    { setSubmitting, setErrors, resetForm }: any
  ) => {
    let data = {
      ...value,
      firstname: value.name.split(" ")[0],
      lastname: value.name.split(" ").length > 1 ? value.name.split(" ")[1] : ""
    };

    let token = sessionStorage.getItem("token");
    props
      .createUser({ data }, token)
      .then(() => {
        toast.info(<Notification message="User Created Successfully!!!" />);
        props.fetchUsers(token);
        resetForm();
        setOpen(false);
      })
      .catch(() => {
        setErrors({
          username: "User already exists",
          email: "Email already exists"
        });
        toast.info(
          <Notification
            error
            message="Failed To Create User. Please Try Again"
          />
        );
      });
    setSubmitting(false);
  };

  return (
    <Formik
      enableReinitialize={true}
      initialValues={userInitialValues()}
      validationSchema={userSchema}
      onSubmit={onSubmit}
      render={(formikProps: any) => (
        <CreateUserView
          open={open}
          setOpen={setOpen}
          {...props}
          {...formikProps}
        />
      )}
    />
  );
}

type Props = {
  createUser: Function;
  fetchUsers: Function;
  roles: Array<any>;
  errors?: any;
};

export default CreateUserContainer;
