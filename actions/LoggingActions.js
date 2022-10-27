import api from "../api/api";
export const USER_LOGGED_IN = "USER_LOGGED_IN";
export const NO_USER = "NO_USER";
export const GET_WORDS_LIST = "GET_WORDS_LIST";

export const logInAction = (payload) => ({
  type: USER_LOGGED_IN,
  payload,
});

export const getUserData = () => (dispatch) => {
  api
    .get("/users/profile")
    .then((response) => {
      dispatch(logInAction(response.data));
    })
    .catch((err) => {
      dispatch({
        type: NO_USER,
      });
    });
  api.get(`/words?page=1&size=20`).then((response) => {
    let wordsList = response.data;
    dispatch({
      type: GET_WORDS_LIST,
      payload: wordsList,
    });
  });
};
