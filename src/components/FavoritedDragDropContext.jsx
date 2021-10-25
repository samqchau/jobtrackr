import React from 'react';
import axios from 'axios';
import { DragDropContext } from 'react-beautiful-dnd';
import { useSelector, useDispatch } from 'react-redux';
import { USER_APPS_SUCCESS } from '../constants/appConstants';

const FavoritedDragDropContext = ({ children }) => {
  const dispatch = useDispatch();
  const userApps = useSelector((state) => state.userApps);
  const { apps } = userApps;

  const onDragEnd = async (result) => {
    const { destination, source, draggableId } = result;
    if (!destination) {
      return;
    }
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    let moveData = {
      sourceIndex: source.index,
      destinationIndex: destination.index,
      appId: draggableId,
    };

    let appsCopy = apps;

    if (source.index < destination.index) {
      for (let key in appsCopy) {
        appsCopy[key].forEach((e) => {
          if (e.fav_index > source.index && e.fav_index <= destination.index) {
            e.fav_index -= 1;
            return;
          }
          if (e.fav_index === source.index) {
            e.fav_index = destination.index;
          }
        });
      }
    } else {
      for (let key in appsCopy) {
        appsCopy[key].forEach((e) => {
          if (e.fav_index < source.index && e.fav_index >= destination.index) {
            e.fav_index += 1;
            return;
          }
          if (e.fav_index === source.index) {
            e.fav_index = destination.index;
          }
        });
      }
    }

    localStorage.setItem('apps', JSON.stringify(appsCopy));
    dispatch({ type: USER_APPS_SUCCESS, payload: appsCopy });
  };

  return <DragDropContext onDragEnd={onDragEnd}>{children}</DragDropContext>;
};

export default FavoritedDragDropContext;
