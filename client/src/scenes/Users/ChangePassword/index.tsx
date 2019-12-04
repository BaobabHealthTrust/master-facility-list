import React from "react";
import ChangePasswordContainer from "./ChangePassword.container";

function ChangePassword(props: Props) {
  const { open, setOpen } = props;
  return <ChangePasswordContainer open={open} setOpen={setOpen} />;
}

type Props = {
  open: boolean;
  setOpen: Function;
};

export default ChangePassword;
