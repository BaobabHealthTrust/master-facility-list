import React, { useState } from "react";
import { Formik } from "formik";
import UpdateMyDetailsView from "./UpdateMyDetails.view";
import { updateSchema } from "../../../components/organisms/UsersForms/schema";
import { userInitialValues } from "../../../components/organisms/UsersForms/initialValues";
import Notification from "../../../components/atoms/Notification";
import { toast } from "react-toastify";

function UpdateMyDetailsContainer(props: Props) {
  const [open, setOpen] = useState(false);
  const { user } = props;

  const onSubmit = (
    value: any,
    { setSubmitting, resetForm, setErrors }: any
  ) => {
    let data = {
      ...value,
      firstname: value.name.split(" ")[0],
      lastname: value.name.split(" ").length > 0 ? value.name.split(" ")[1] : ""
    };

    let token = sessionStorage.getItem("token");
    props
      .updateUser(props.user.id, data, token)
      .then(() => {
        toast.info(<Notification message="Details Updated Successfully!!!" />);
        props.fetchUsers(token);
        props.fetchUserDetails(props.user.id, token);
        resetForm();
        setOpen(false);
      })
      .catch(() => {
        setErrors({
          username: "",
          email: ""
        });
        toast.info(
          <Notification
            error
            message="Failed To Update Details. Please Try Again"
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
      onSubmit={onSubmit}
      render={(formikProps: any) => (
        <UpdateMyDetailsView
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
  fetchUserDetails: Function;
  errors?: any;
  roles: Array<any>;
};

export default UpdateMyDetailsContainer;
