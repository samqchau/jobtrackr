import { v4 as uuid } from 'uuid';
import {
  POST_NOTE_REQUEST,
  POST_NOTE_SUCCESS,
  POST_NOTE_FAIL,
} from '../constants/noteConstants';
import { USER_APPS_SUCCESS } from '../constants/appConstants';
import nameValuePairs from '../data/lookUpTables/listNameValuePairs';
//DONE
export const saveNote = (app, content) => async (dispatch, getState) => {
  try {
    dispatch({ type: POST_NOTE_REQUEST });
    const {
      userApps: { apps },
    } = getState();
    let created_on = new Date();
    var dd = String(created_on.getDate()).padStart(2, '0');
    var mm = String(created_on.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = created_on.getFullYear();
    created_on = mm + '/' + dd + '/' + yyyy;

    let note = {
      content,
      id: uuid(),
      created_on,
    };
    let appsCopy = apps;
    let listName = nameValuePairs[app.list];
    let arr = appsCopy[listName];
    let index = arr.findIndex((e) => e.id === app.id);
    arr[index].notes.unshift(note);
    appsCopy[listName] = arr;
    localStorage.setItem('apps', JSON.stringify(appsCopy));
    dispatch({ type: USER_APPS_SUCCESS, payload: appsCopy });
    dispatch({ type: POST_NOTE_SUCCESS });
  } catch (error) {
    dispatch({ type: POST_NOTE_FAIL });
  }
};

//DONE
export const deleteNoteById = (app, noteId) => async (dispatch, getState) => {
  const {
    userApps: { apps },
  } = getState();

  let appsCopy = apps;
  let listName = nameValuePairs[app.list];
  let arr = appsCopy[listName];
  let index = arr.findIndex((e) => e.id === app.id);
  arr[index].notes = arr[index].notes.filter((note) => note.id !== noteId);
  appsCopy[listName] = arr;
  localStorage.setItem('apps', JSON.stringify(appsCopy));
  dispatch({ type: USER_APPS_SUCCESS, payload: appsCopy });
};

//DONE
export const updateNoteById =
  (app, note, content) => async (dispatch, getState) => {
    const {
      userApps: { apps },
    } = getState();
    let appsCopy = apps;
    let listName = nameValuePairs[app.list];
    let arr = appsCopy[listName];
    let updated_on = new Date();
    var dd = String(updated_on.getDate()).padStart(2, '0');
    var mm = String(updated_on.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = updated_on.getFullYear();
    updated_on = mm + '/' + dd + '/' + yyyy;

    let index = arr.findIndex((e) => e.id === app.id);
    let noteIndex = arr[index].notes.findIndex((e) => e.id === note.id);
    arr[index].notes[noteIndex] = {
      ...note,
      content,
      updated_on,
    };
    appsCopy[listName] = arr;
    localStorage.setItem('apps', JSON.stringify(appsCopy));
    dispatch({ type: USER_APPS_SUCCESS, payload: appsCopy });
  };
