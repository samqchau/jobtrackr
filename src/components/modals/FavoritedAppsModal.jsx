import React from 'react';
import { Modal } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { Droppable } from 'react-beautiful-dnd';
import AppCard from '../AppCard';
import FavoritedDragDropContext from '../FavoritedDragDropContext.jsx';
import '../../styles/favoritedAppsModal.css';

const FavoritedAppsModal = ({ show, onHide }) => {
  const userApps = useSelector((state) => state.userApps);
  const { apps } = userApps;
  let favoritedApps = [];
  for (let list in apps) {
    favoritedApps = [...favoritedApps, ...apps[list]];
  }

  return (
    <FavoritedDragDropContext>
      <Modal
        show={show}
        onHide={onHide}
        centered
        size='xl'
        className='favoritesModal'
        onClick={() => {}}
      >
        <Modal.Body className='favoritesModal-body'>
          <div className='list-container'>
            <div className='list-header'>
              <span className='list-header-icon'>
                <i className='far fa-bookmark' />
              </span>
              <div className='list-header-main'>
                <div className='list-header-main-title'>Favorited</div>
                <div className='list-header-main-count'>
                  {favoritedApps.filter((app) => app.favorited === true)
                    .length === 0
                    ? 0
                    : favoritedApps.filter((app) => app.favorited === true)
                        .length}{' '}
                  {`job${
                    favoritedApps.filter((app) => app.favorited === true)
                      .length === 1
                      ? ''
                      : 's'
                  }`}
                </div>
              </div>
            </div>

            <Droppable droppableId='favorited'>
              {(provided) => (
                <div
                  className='list-body-main'
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                >
                  {favoritedApps &&
                    favoritedApps
                      .filter((app) => app.favorited === true)
                      .sort((a, b) => a.fav_index - b.fav_index)
                      .map((app) => (
                        <AppCard
                          app={app}
                          key={app.id}
                          favslist
                          index={app.fav_index}
                        />
                      ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </div>
        </Modal.Body>
      </Modal>
    </FavoritedDragDropContext>
  );
};

export default FavoritedAppsModal;
