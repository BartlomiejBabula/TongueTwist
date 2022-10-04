import { USER_LOGGED_IN } from "../actions/LoggingActions";
import { USER_LOGGED_OUT } from "../actions/LogoutActions";
import { GET_WORDS_LIST } from "../actions/LoggingActions";
import { ADD_WORD } from "../actions/WordsActions";
import { UPDATE_WORD } from "../actions/WordsActions";
import { UPDATE_PAGE } from "../actions/WordsActions";
import { UPDATE_WORDS_LIST } from "../actions/WordsActions";

const initState = {
  isLogged: false,
};

export const userReducer = (state = initState, action) => {
  switch (action.type) {
    case USER_LOGGED_IN: {
      return { ...state, ...action.payload, isLogged: true, page: 1 };
    }
    case USER_LOGGED_OUT: {
      return { isLogged: false };
    }
    case GET_WORDS_LIST: {
      return { ...state, wordsList: action.payload };
    }
    case UPDATE_WORDS_LIST: {
      return { ...state, wordsList: [...state.wordsList, ...action.payload] };
    }
    case ADD_WORD: {
      return {
        ...state,
        wordsList: [...state.wordsList, action.payload],
      };
    }
    case UPDATE_PAGE: {
      return {
        ...state,
        page: action.payload,
      };
    }
    case UPDATE_WORD: {
      return {
        ...state,
        wordsList: state.wordsList.map((word) =>
          word.id === action.payload.id ? action.payload : word
        ),
      };
    }
    default:
      return state;
  }
};
