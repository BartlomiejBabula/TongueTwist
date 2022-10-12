import api from "../api/api";
export const UPDATE_USER = "UPDATE_USER";

export const updateUser = (data) => (dispatch) => {
  api
    .patch(`/users/profile`, data)
    .then(function (response) {
      let newUser = response.data;
      dispatch({
        type: UPDATE_USER,
        payload: newUser,
      });
    })
    .catch(function (error) {});
};
