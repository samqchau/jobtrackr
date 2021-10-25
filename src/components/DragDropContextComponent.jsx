import React from 'react';
import axios from 'axios';
import { DragDropContext } from 'react-beautiful-dnd';
import { useDispatch, useSelector } from 'react-redux';
import { USER_APPS_SUCCESS } from '../constants/appConstants';
import nameValuePairs from '../data/lookUpTables/listNameValuePairs';

const DragDropContextComponent = ({ children }) => {
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const userApps = useSelector((state) => state.userApps);
  const { apps } = userApps;

  const onDragEnd = async (result) => {
    const { destination, source, draggableId } = result;
    if (!destination) return;

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    )
      return;

    let appsCopy = apps;

    let config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
        'Content-Type': 'application/json',
      },
    };

    let moveData = {
      sourceIndex: source.index,
      destinationIndex: destination.index,
      sourceList: source.droppableId,
      destinationList: destination.droppableId,
      appId: draggableId,
    };

    if (destination.droppableId === source.droppableId) {
      let listName = destination.droppableId;
      let arr = appsCopy[listName];
      let app = arr.splice(source.index, 1);
      app = app[0];

      if (source.index < destination.index) {
        for (let i = source.index; i < destination.index; i++) {
          arr[i].index = arr[i].index - 1;
        }
      } else {
        for (let i = destination.index; i < source.index; i++) {
          arr[i].index = arr[i].index + 1;
        }
      }
      app.index = destination.index;
      arr.splice(destination.index, 0, app);
      appsCopy[listName] = arr;

      await axios.put('/api/apps/update/index', moveData, config);

      dispatch({ type: USER_APPS_SUCCESS, payload: appsCopy });
      return;
    }

    if (destination.droppableId !== source.droppableId) {
      let sourceArr = appsCopy[source.droppableId];

      let destinationArr = appsCopy[destination.droppableId];
      let app = sourceArr.splice(source.index, 1);
      app = app[0];
      app.index = destination.index;
      app.list = nameValuePairs.indexOf(destination.droppableId);
      for (let i = source.index; i < sourceArr.length; i++) {
        sourceArr[i].index -= 1;
      }
      for (let i = destination.index; i < destinationArr.length; i++) {
        destinationArr[i].index += 1;
      }
      destinationArr.splice(destination.index, 0, app);
      appsCopy[source.droppableId] = sourceArr;
      appsCopy[destination.droppableId] = destinationArr;

      dispatch({ type: USER_APPS_SUCCESS, payload: appsCopy });
      await axios.put('/api/apps/update/index', moveData, config);
    }
  };

  return <DragDropContext onDragEnd={onDragEnd}>{children}</DragDropContext>;
};

export default DragDropContextComponent;
