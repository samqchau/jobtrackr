import {
  POST_NOTE_REQUEST,
  POST_NOTE_SUCCESS,
  POST_NOTE_FAIL,
  POST_NOTE_RESET,
} from '../constants/noteConstants';

export const notePostReducer = (state, action) => {
  switch (action.type) {
    case POST_NOTE_REQUEST:
      return { loading: true };
    case POST_NOTE_SUCCESS:
      return { loading: false, success: true };
    case POST_NOTE_FAIL:
      return { loading: false, error: action.payload };
    case POST_NOTE_RESET:
      return {};
    default:
      return { ...state };
  }
};
