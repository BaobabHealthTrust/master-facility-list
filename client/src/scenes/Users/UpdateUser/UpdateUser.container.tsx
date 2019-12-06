import React, { useState } from "react";
import { updateSchema } from "../../../components/organisms/UsersForms/schema";
import { userInitialValues } from "../../../components/organisms/UsersForms/initialValues";
import { Formik } from "formik";
import { toast } from "react-toastify";
import Notification from "../../../components/atoms/Notification";
import UpdateUserView from "./UpdateUser.view";

function UpdateUserContainer(props: Props) {
  const { user } = props;
  const [open, setOpen] = useState(false);

  const onSubmit = (
    value: any,
    { setSubmitting, resetForm, setErrors }: any
  ) => {
    let data = {
      ...value,
      firstname: value.name.split(" ")[0],
      lastname: value.name.split(" ").length > 1 ? value.name.split(" ")[1] : ""
    };

    let token = sessionStorage.getItem("token");
    console.log(data);
    props
      .updateUser(props.user.id, data, token)
      .then(() => {
        toast.info(<Notification message="User Updated Successfully!!!" />);
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
            message="Failed To Update User. Please Try Again"
          />
        );
      });
    setSubmitting(false);
  };

  return (
    <Formik
      enableReinitialize={true}
      initialValues={userInitialValues(user)}
      validationSchema={updateSchema}
      onSubmit={onSubmit as any}
      render={(formikProps: any) => (
        <UpdateUserView
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
  user: any;
  updateUser: Function;
  fetchUsers: Function;
  roles: Array<any>;
  errors?: any;
};

export default UpdateUserContainer;
