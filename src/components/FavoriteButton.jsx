import React from 'react';
import { useDispatch } from 'react-redux';
import '../styles/favoriteButton.css';
import { favoriteAppById } from '../actions/appActions';

const FavoriteButton = ({ app, color, demoButton, setApps }) => {
  const dispatch = useDispatch();
  let { favorited } = app;

  const handleClick = (e) => {
    e.stopPropagation();
    let updatedApp = app;
    updatedApp.favorited = !favorited;
    if (demoButton) {
      setApps([app]);
    }
    if (!demoButton) {
      dispatch(favoriteAppById(updatedApp));
    }
  };

  return (
    <i
      className={` ${`${
        favorited ? 'fas' : 'far'
      } fa-bookmark`} favoriteButton ${color && color}`}
      onClick={handleClick}
      title='Favorite'
    ></i>
  );
};

export default FavoriteButton;
