import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Row, Col } from 'react-bootstrap';
import '../styles/listSelect.css';
import nameValuePairs from '../data/lookUpTables/listNameValuePairs';
import { USER_APPS_SUCCESS } from '../constants/appConstants';

const ListSelect = ({ close, app }) => {
  const dispatch = useDispatch();
  const userApps = useSelector((state) => state.userApps);
  const { apps } = userApps;

  const handleClick = async (e, i) => {
    e.stopPropagation();

    if (i !== app.list) {
      let sourceIndex = app.index;
      let destinationIndex = 0;
      let sourceList = app.list;
      let sourceListName = nameValuePairs[sourceList];
      let destinationList = i;
      let destinationListName = nameValuePairs[destinationList];

      let appsCopy = apps;
      let sourceArr = appsCopy[sourceListName];
      let destinationArr = appsCopy[destinationListName];
      let updatedApp = sourceArr.splice(sourceIndex, 1);
      updatedApp = updatedApp[0];
      updatedApp.index = 0;
      updatedApp.list = destinationList;
      for (let i = sourceIndex; i < sourceArr.length; i++) {
        sourceArr[i].index -= 1;
      }
      for (let i = destinationIndex; i < destinationArr.length; i++) {
        destinationArr[i].index += 1;
      }
      destinationArr.unshift(updatedApp);
      appsCopy[sourceListName] = sourceArr;
      appsCopy[destinationListName] = destinationArr;
      localStorage.setItem('apps', JSON.stringify(appsCopy));
      dispatch({ type: USER_APPS_SUCCESS, payload: appsCopy });
      close();
    }
  };

  return (
    <Row className='list-select-container'>
      {nameValuePairs.map(
        (list, i) =>
          list && (
            <Col
              className={`list-select-item noselect ${
                app.list === i ? 'current-active-list' : ''
              } modal-nav-link ${app.color} ${app.color}-card-border`}
              key={i}
              xs={12}
              onClick={(e) => {
                handleClick(e, i);
              }}
            >
              {list}
            </Col>
          )
      )}
    </Row>
  );
};

export default ListSelect;
