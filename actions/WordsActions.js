import api from "../api/api";
export const ADD_WORD = "ADD_WORD";
export const UPDATE_WORD = "UPDATE_WORD";
export const UPDATE_PAGE = "UPDATE_PAGE";
export const UPDATE_WORDS_LIST = "UPDATE_WORDS_LIST";

export const updateWordsList = (page) => (dispatch) => {
  api
    .get(`/words?page=${page}&size=20`)
    .then((response) => {
      let wordsList = response.data;
      dispatch({
        type: UPDATE_WORDS_LIST,
        payload: wordsList,
      });
    })
    .catch(function (error) {
      console.log(error);
    });
};

export const addWord = (word) => (dispatch) => {
  api
    .post(`/words`, word)
    .then(function (response) {
      let newWord = response.data;
      dispatch({
        type: ADD_WORD,
        payload: newWord,
      });
    })
    .catch(function (error) {
      console.log(error);
    });
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

export const updatePage = (page) => (dispatch) => {
  dispatch({
    type: UPDATE_PAGE,
    payload: page,
  });
};
