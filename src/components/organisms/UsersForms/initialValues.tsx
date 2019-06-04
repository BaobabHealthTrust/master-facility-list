export const userInitialValues = (user: any = null) => {
  return {
    name: user === null ? null : `${user.firstname} ${user.lastname}`,
    username: user === null ? null : user.username,
    email: user === null ? null : user.email,
    password: null,
    confirmPassword: null
  };
};
