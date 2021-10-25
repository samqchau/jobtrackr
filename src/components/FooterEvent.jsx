import React from 'react';
import { formatDate, trimDate } from '../helpers/dateHelpers';

const FooterEvent = ({ app }) => {
  let {
    offer_acceptance,
    offer,
    interview,
    deadline,
    application,
    date_applied,
  } = app;

  let text;

  if (offer_acceptance) {
    text = `Accept Offer by: ${formatDate(trimDate(offer_acceptance))}`;
  } else if (offer) {
    text = `Offer Recieved on: ${formatDate(trimDate(offer))}`;
  } else if (interview) {
    text = `Interview Date: ${formatDate(trimDate(interview))}`;
  } else if (deadline) {
    text = `Application Deadline: ${formatDate(trimDate(deadline))}`;
  } else if (application) {
    text = `Applied On: ${formatDate(trimDate(application))}`;
  } else if (date_applied) {
    text = `Created On: ${formatDate(trimDate(date_applied))}`;
  }
  return <div>{text}</div>;
};

export default FooterEvent;
