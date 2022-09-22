export const USER_LOGGED_OUT = "USER_LOGGED_OUT";

export const logOutAction = (payload) => ({
  type: USER_LOGGED_OUT,
  payload,
});
