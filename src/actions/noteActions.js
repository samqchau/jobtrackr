import axios from 'axios';
import {
  POST_NOTE_REQUEST,
  POST_NOTE_SUCCESS,
  POST_NOTE_FAIL,
} from '../constants/noteConstants';
import { USER_APPS_SUCCESS } from '../constants/appConstants';
import nameValuePairs from '../data/lookUpTables/listNameValuePairs';

export const saveNote = (app, content) => async (dispatch, getState) => {
  try {
    dispatch({ type: POST_NOTE_REQUEST });
    const {
      userLogin: { userInfo },
    } = getState();
    const {
      userApps: { apps },
    } = getState();
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
        'Content-Type': 'application/json',
      },
    };

    let { data } = await axios.post(`/api/apps/${app.id}`, { content }, config);
    let appsCopy = apps;
    let listName = nameValuePairs[app.list];
    let arr = appsCopy[listName];
    let index = arr.findIndex((e) => e.id === app.id);
    arr[index].notes.unshift(data);
    appsCopy[listName] = arr;
    dispatch({ type: USER_APPS_SUCCESS, payload: appsCopy });
    dispatch({ type: POST_NOTE_SUCCESS });
  } catch (error) {
    dispatch({ type: POST_NOTE_FAIL });
  }
};

export const deleteNoteById = (app, noteId) => async (dispatch, getState) => {
  const {
    userLogin: { userInfo },
  } = getState();
  const {
    userApps: { apps },
  } = getState();

  const config = { headers: { Authorization: `Bearer ${userInfo.token}` } };

  let appsCopy = apps;
  let listName = nameValuePairs[app.list];
  let arr = appsCopy[listName];
  let index = arr.findIndex((e) => e.id === app.id);
  arr[index].notes = arr[index].notes.filter((note) => note.id !== noteId);
  appsCopy[listName] = arr;
  dispatch({ type: USER_APPS_SUCCESS, payload: appsCopy });
  await axios.delete(`/api/notes/${noteId}`, config);
};

export const updateNoteById = (app, note) => async (dispatch, getState) => {
  const {
    userLogin: { userInfo },
  } = getState();
  const {
    userApps: { apps },
  } = getState();
  const config = {
    headers: {
      Authorization: `Bearer ${userInfo.token}`,
      'Content-Type': 'application/json',
    },
  };

  let { data } = await axios.put(`/api/notes/${note.noteId}`, note, config);
  let appsCopy = apps;
  let listName = nameValuePairs[app.list];
  let arr = appsCopy[listName];

  let index = arr.findIndex((e) => e.id === app.id);
  let noteIndex = arr[index].notes.findIndex((e) => e.id === note.noteId);
  arr[index].notes[noteIndex] = data;
  appsCopy[listName] = arr;
  dispatch({ type: USER_APPS_SUCCESS, payload: appsCopy });
};
