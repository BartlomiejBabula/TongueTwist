import api from "../api/api";
export const USER_LOGGED_IN = "USER_LOGGED_IN";
export const GET_WORDS_LIST = "GET_WORDS_LIST";

export const logInAction = (payload) => ({
  type: USER_LOGGED_IN,
  payload,
});

export const getUserData = () => (dispatch) => {
  api.get("/auth/profile").then((response) => {
    dispatch(logInAction(response.data));
    api.get(`/users/${response.data.id}/words`).then((response) => {
      let wordsList = response.data;
      dispatch({
        type: GET_WORDS_LIST,
        payload: wordsList,
      });
    });
  });
};
