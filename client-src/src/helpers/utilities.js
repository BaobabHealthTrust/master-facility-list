export const isAdmin = () => {
  return sessionStorage.getItem("token");
};
