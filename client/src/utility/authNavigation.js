export const authorisedLoggedIn = (err) => {
  if (!err?.response?.data?.isLoggedIn) {
    return false;
  } else {
    return true;
  }
};
