import React, { useState } from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import '../styles/demo.css';
import DemoAppList from '../components/DemoAppList';

const Demo = () => {
  const [apps, setApps] = useState([
    {
      id: 1,
      jobTitle: 'Operations manager',
      companyName: 'Pilapas and Potatoes Co.',
      list: 'applied',
      favorited: false,
      salary: '71,000',
      deadline: '2021-12-31',
      location: 'Miami, Florida',
      description:
        'Palapas Restaurant, a Mexican-Seafood eatery and full bar with over 31 years in business under the same ownership, is hiring a dedicated Operations Manager to oversee all facets of the business. Palapas caters to locals and tourists alike in our ocean-view, resort-adjacent location. Indoor maximum capacity is 145 people and outdoor patios seat an additional 75 people. We are seeking a hard-working, trustworthy, dependable, and experienced Manager who can provide strong leadership to our team and drive high standards for all aspects of the business.',
    },
  ]);

  const changeAppsTo = (apps) => {
    setApps(apps);
  };

  const onDragEnd = (result) => {
    const { destination, source } = result;
    if (!destination) {
      return;
    }
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }
    if (destination.droppableId !== source.droppableId) {
      let appsCopy = apps.map((app) => {
        return { ...app, list: destination.droppableId };
      });
      setApps(appsCopy);
    }
  };

  return (
    <>
      <DragDropContext onDragEnd={onDragEnd}>
        <DemoAppList
          name='applied'
          icon='far fa-paper-plane'
          apps={apps}
          setApps={changeAppsTo}
        />
        <DemoAppList
          name='offer accepted'
          icon='fas fa-award'
          apps={apps}
          setApps={changeAppsTo}
        />
      </DragDropContext>
    </>
  );
};

export default Demo;
