export const userInitialValues = (
  user: any = null,
  currentUser: boolean = false
) => {
  return user != null || !currentUser
    ? {
        name: user === null ? null : `${user.firstname} ${user.lastname}`,
        username: user === null ? null : user.username,
        email: user === null ? null : user.email,
        role: user && user.role ? user.role.id : 1
      }
    : {
        name: user === null ? null : `${user.firstname} ${user.lastname}`,
        username: user === null ? null : user.username,
        email: user === null ? null : user.email,
        password: user === null ? null : user.password,
        confirmPassword: user === null ? null : user.password,
        role: user && user.role ? user.role.id : 1
      };
};
