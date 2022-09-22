import api from "../api/api";
export const ADD_WORD = "ADD_WORD";
export const UPDATE_WORD = "UPDATE_WORD";

export const addWord = (word) => (dispatch) => {
  api
    .post(`/words/`, word)
    .then(function (response) {
      let newWord = response.data;
      dispatch({
        type: ADD_WORD,
        payload: newWord,
      });
    })
    .catch(function (error) {});
};

export const updateWord = (word) => (dispatch) => {
  api
    .patch(`/words/${word.id}`, word)
    .then(function (response) {
      let updateWord = response.data;
      dispatch({
        type: UPDATE_WORD,
        payload: updateWord,
      });
    })
    .catch(function (error) {});
};
