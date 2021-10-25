import React, { useState } from 'react';
import { Draggable } from 'react-beautiful-dnd';
import FavoriteButton from './FavoriteButton';
import DemoAppDetailModal from './DemoAppDetailModal';

const DemoAppCard = ({ app, index, setApps }) => {
  const { id, jobTitle, companyName } = app;
  const [showDetailModal, setShowDetailModal] = useState(false);

  const openDetailsModal = () => {
    setShowDetailModal(true);
  };

  const handleClose = () => {
    setShowDetailModal(false);
  };

  return (
    <>
      <Draggable draggableId={`${id}`} index={index}>
        {(provided) => (
          <div
            className={`app-card default default-card-border`}
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            onClick={openDetailsModal}
          >
            <div className='app-card-body demo-app-card-body'>
              <div className='app-card-body-left'>
                <span className='app-card-body-job'>{jobTitle}</span>
                <span className='app-card-body-company'>{companyName}</span>
              </div>
              <div className='app-card-body-right'>
                <FavoriteButton
                  app={app}
                  color={app.color}
                  demoButton={true}
                  setApps={setApps}
                />
              </div>
            </div>
            <div className='app-card-footer'>
              <div className='app-card-footer-content'></div>
            </div>
          </div>
        )}
      </Draggable>
      <DemoAppDetailModal
        app={app}
        handleClose={handleClose}
        show={showDetailModal}
        setApps={setApps}
      />
    </>
  );
};

export default DemoAppCard;
