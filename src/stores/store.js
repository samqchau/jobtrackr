import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import { userLoginReducer, userRegisterReducer } from '../reducers/userReducer';
import {
  userAppsReducer,
  postAppReducer,
  updateAppReducer,
  toolTipReducer,
} from '../reducers/appReducer';
import { notePostReducer } from '../reducers/noteReducer';
import { noApps } from '../helpers/NoApps.js';

const reducer = combineReducers({
  userApps: userAppsReducer,
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  postApp: postAppReducer,
  updateApp: updateAppReducer,
  notePost: notePostReducer,
  toolTip: toolTipReducer,
});

const userInfoFromStorage = sessionStorage.getItem('userInfo')
  ? JSON.parse(sessionStorage.getItem('userInfo'))
  : null;

const userAppsFromStorage = localStorage.getItem('apps')
  ? JSON.parse(localStorage.getItem('apps'))
  : {
      wishlist: [],
      applied: [],
      phone: [],
      'on site': [],
      offer: [],
      rejected: [],
    };

const initialState = {
  userLogin: { userInfo: userInfoFromStorage },
  userApps: {
    apps: userAppsFromStorage,
    displayToolTip: noApps(userAppsFromStorage),
  },
  toolTip: noApps(userAppsFromStorage),
};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
