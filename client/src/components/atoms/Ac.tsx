import React from "react";
import { acl, acActions } from "../../acl";

export const check = (
  rules: any = acl,
  role: any,
  action: acActions,
  data: any = null
) => {
  const permissions = rules[role];

  if (!permissions) return false;

  if (permissions.static && permissions.static.includes(action)) return true;

  if (permissions.dynamic) {
    if (!permissions.dynamic[`${action}`]) return false;
    return permissions.dynamic[`${action}`](data);
  }
  return false;
};

const Ac = (props: Props) =>
  check(acl, props.role, props.action, props.data)
    ? props.allowed && props.allowed()
    : props.denied && props.denied();

Ac.defaultProps = {
  allowed: () => null,
  denied: () => null
};

type Props = {
  role: string;
  action: acActions;
  allowed?: Function;
  denied?: Function;
  data?: any;
};
export default Ac;
