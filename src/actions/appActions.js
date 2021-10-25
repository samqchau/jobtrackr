import axios from 'axios';
import {
  USER_APPS_SUCCESS,
  POST_APP_REQUEST,
  POST_APP_SUCCESS,
  POST_APP_FAIL,
  UPDATE_APP_REQUEST,
  UPDATE_APP_SUCCESS,
  UPDATE_APP_FAIL,
  UPDATE_APP_RESET,
} from '../constants/appConstants';
import listNameValuePairs from '../data/lookUpTables/listNameValuePairs';
import { v4 as uuid } from 'uuid';

//DONE
export const addAppToList = (application) => async (dispatch, getState) => {
  dispatch({ type: POST_APP_REQUEST });
  try {
    const {
      userApps: { apps },
    } = getState();
    application.id = uuid();
    let list = listNameValuePairs[application.list];

    let appsCopy = apps;

    appsCopy[list].forEach((app) => {
      app.index++;
    });
    appsCopy[list].sort((a, b) => a.index - b.index);
    appsCopy[list].unshift(application);
    localStorage.setItem('apps', JSON.stringify(appsCopy));
    dispatch({ type: USER_APPS_SUCCESS, payload: appsCopy });
    dispatch({ type: POST_APP_SUCCESS });
  } catch (error) {
    dispatch({
      type: POST_APP_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

//DONE
export const deleteAppById = (app) => async (dispatch, getState) => {
  const {
    userApps: { apps },
  } = getState();
  const { id, list, index, fav_index, favorited } = app;

  let appsCopy = apps;

  if (favorited) {
    for (let key in appsCopy) {
      appsCopy[key].forEach((app) => {
        if (app.fav_index > fav_index) {
          app.fav_index -= 1;
        }
      });
    }
  }

  let listName = listNameValuePairs[list];
  let appsArr = appsCopy[listName];

  appsArr.forEach((app) => {
    if (app.index > index) app.index -= 1;
  });

  appsArr = appsArr.filter((app) => app.id !== id);
  appsCopy[listName] = appsArr;
  localStorage.setItem('apps', JSON.stringify(appsCopy));
  dispatch({ type: USER_APPS_SUCCESS, payload: appsCopy });
};
//DONE
export const updateAppById = (app) => async (dispatch, getState) => {
  try {
    dispatch({ type: UPDATE_APP_REQUEST });
    let {
      userApps: { apps },
    } = getState();
    let list = listNameValuePairs[app.list];
    let appsCopy = apps;
    let arr = apps[list];
    arr[arr.indexOf((e) => (e.id = app.id))] = app;
    appsCopy[list] = arr;
    localStorage.setItem('apps', JSON.stringify(appsCopy));
    dispatch({ type: USER_APPS_SUCCESS, payload: appsCopy });
    dispatch({ type: UPDATE_APP_SUCCESS });
    setTimeout(() => {
      dispatch({ type: UPDATE_APP_RESET });
    }, 1500);
  } catch (error) {
    dispatch({
      type: UPDATE_APP_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
//DONE
export const favoriteAppById = (app) => async (dispatch, getState) => {
  let {
    userApps: { apps },
  } = getState();

  if (app.favorited) {
    for (let key in apps) {
      apps[key].forEach((e) => {
        if (e.fav_index >= 0) {
          e.fav_index += 1;
        }
      });
    }
    app.fav_index = 0;
  } else {
    for (let key in apps) {
      apps[key].forEach((e) => {
        if (e.fav_index > app.fav_index) {
          e.fav_index -= 1;
        }
      });
    }
    app.fav_index = null;
  }

  let list = listNameValuePairs[app.list];
  let appsCopy = apps;
  let arr = apps[list];
  arr[arr.indexOf((e) => (e.id = app.id))] = app;
  appsCopy[list] = arr;
  localStorage.setItem('apps', JSON.stringify(appsCopy));
  dispatch({ type: USER_APPS_SUCCESS, payload: appsCopy });
};
