import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import { userLoginReducer, userRegisterReducer } from '../reducers/userReducer';
import {
  userAppsReducer,
  postAppReducer,
  updateAppReducer,
} from '../reducers/appReducer';
import { notePostReducer } from '../reducers/noteReducer';
const reducer = combineReducers({
  userApps: userAppsReducer,
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  postApp: postAppReducer,
  updateApp: updateAppReducer,
  notePost: notePostReducer,
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
  userApps: { apps: userAppsFromStorage },
};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
