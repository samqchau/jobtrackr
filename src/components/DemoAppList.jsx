import React from 'react';
import { Col } from 'react-bootstrap';
import { Droppable } from 'react-beautiful-dnd';
import '../styles/demo.css';
import DemoAppCard from '../components/DemoAppCard';

const DemoAppList = ({ icon, name, apps, setApps, iconColor }) => {
  return (
    <Col xs={12} className='demo-list-container'>
      <div className='list-header'>
        <span className='list-header-icon demo-list-header-icon'>
          <i className={`${icon}`} style={{ color: iconColor }}></i>
        </span>
        <div className='list-header-main demo-list-header-main'>{name}</div>
        <div className='list-header-main-count'></div>
      </div>
      <Droppable droppableId={name}>
        {(provided) => (
          <div
            className='list-body-main demo-list-body-main'
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            {apps &&
              apps
                .filter((app) => app.list === name)
                .map((app, index) => (
                  <DemoAppCard
                    app={app}
                    key={app.id}
                    index={app.id}
                    setApps={setApps}
                  />
                ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </Col>
  );
};

export default DemoAppList;
