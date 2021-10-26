import React from 'react';
import AppList from '../components/AppList';
import DragDropContextComponent from '../components/DragDropContextComponent';

const HomeScreen = ({ history }) => {
  return (
    <>
      <DragDropContextComponent>
        <AppList
          name='wishlist'
          icon='fas fa-calendar-alt'
          listIntFromDB={1}
          displayToolTip={true}
        />
        <AppList name='applied' icon='far fa-paper-plane' listIntFromDB={2} />
        <AppList
          name='phone'
          icon='fas fa-phone-square-alt'
          listIntFromDB={3}
          displayToolTip={false}
        />
        <AppList
          name='on site'
          icon='fas fa-map-marker-alt'
          listIntFromDB={4}
          displayToolTip={false}
        />
        <AppList
          name='offer'
          icon='fas fa-award'
          listIntFromDB={5}
          displayToolTip={false}
        />
        <AppList
          name='rejected'
          icon='far fa-thumbs-down'
          listIntFromDB={6}
          displayToolTip={false}
        />
      </DragDropContextComponent>
    </>
  );
};

export default HomeScreen;
