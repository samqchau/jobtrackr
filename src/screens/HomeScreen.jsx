import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import AppList from '../components/AppList';
import DragDropContextComponent from '../components/DragDropContextComponent';

const HomeScreen = ({ history }) => {
  const dispatch = useDispatch();

  useEffect(() => {}, [dispatch]);

  return (
    <>
      <DragDropContextComponent>
        <AppList name='wishlist' icon='fas fa-calendar-alt' listIntFromDB={1} />
        <AppList name='applied' icon='far fa-paper-plane' listIntFromDB={2} />
        <AppList
          name='phone'
          icon='fas fa-phone-square-alt'
          listIntFromDB={3}
        />
        <AppList
          name='on site'
          icon='fas fa-map-marker-alt'
          listIntFromDB={4}
        />
        <AppList name='offer' icon='fas fa-award' listIntFromDB={5} />
        <AppList name='rejected' icon='far fa-thumbs-down' listIntFromDB={6} />
      </DragDropContextComponent>
    </>
  );
};

export default HomeScreen;
