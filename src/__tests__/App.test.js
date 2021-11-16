import {
  render,
  screen,
  waitForElementToBeRemoved,
} from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import shortId from '../helpers/generateShortId';

import App from '../App';

it('App renders without crashing', () => {
  render(<App />);
});

it('can create new apps, add them to a list, update the app information, favorite the app, and delete it successfully', async () => {
  render(<App />);
  //Save an application to start tracking
  userEvent.click(screen.getByTestId('create-new-app-1'));
  expect(screen.getByText(/track a new application/i)).toBeVisible();
  let companyName = shortId();
  let jobTitle = shortId();
  const idLength = companyName.length;
  while (companyName === jobTitle) {
    companyName = shortId();
  }

  userEvent.type(
    screen.getByRole('textbox', { name: /company name \*/i }),
    companyName
  );

  userEvent.type(
    screen.getByRole('textbox', {
      name: /job title \*/i,
    }),
    jobTitle
  );

  userEvent.click(screen.getByRole('button', { name: /save/i }));

  expect(screen.getByText(companyName)).toBeInTheDocument();
  expect(screen.getByText(jobTitle)).toBeInTheDocument();

  //update the app information
  userEvent.click(screen.getByText(companyName));
  expect(screen.getByRole('button', { name: /move/i })).toBeVisible();

  companyName = shortId();
  jobTitle = shortId();
  while (companyName === jobTitle) {
    companyName = shortId();
  }

  const companyInput = screen.getByRole('textbox', { name: /company/i });
  const jobInput = screen.getByRole('textbox', { name: /job/i });

  userEvent.clear(companyInput);
  userEvent.clear(jobInput);
  userEvent.type(companyInput, companyName);
  userEvent.type(jobInput, jobTitle);

  expect(jobInput.value.length).toBe(idLength);
  expect(companyInput.value.length).toBe(idLength);

  userEvent.click(screen.getAllByRole('button', { name: /update/i })[0]);
  userEvent.click(screen.getByRole('button', { name: /close/i }));
  await waitForElementToBeRemoved(screen.getAllByText(companyName)[1]);

  expect(screen.getByText(companyName)).toBeVisible();
  expect(screen.getByText(jobTitle)).toBeVisible();

  //The bookmarked list doesn't have the app added
  let n = screen.getAllByText(companyName).length;
  userEvent.click(screen.getByTitle(/show bookmarked/i));
  expect(screen.getByText(/favorited/i)).toBeVisible();
  expect(screen.getAllByText(companyName).length).toBe(n);
  userEvent.click(screen.getByRole('dialog'));
  await waitForElementToBeRemoved(screen.getByRole('dialog'));

  //The app can be added to the bookmarked list
  userEvent.click(screen.getByTitle(/favorite/i));
  userEvent.click(screen.getByTitle(/show bookmarked/i));
  expect(screen.getByText(/favorited/i)).toBeVisible();
  expect(screen.getAllByText(companyName).length).toBe(n + 1);
  userEvent.click(screen.getByRole('dialog'));
  await waitForElementToBeRemoved(screen.getByRole('dialog'));
  expect(screen.getAllByText(companyName).length).toBe(n);

  //The app can be unbookmarked
  userEvent.click(screen.getByTitle(/favorite/i));
  userEvent.click(screen.getByTitle(/show bookmarked/i));
  expect(screen.getByText(/favorited/i)).toBeVisible();
  expect(screen.getAllByText(companyName).length).toBe(n);
  userEvent.click(screen.getByRole('dialog'));
  await waitForElementToBeRemoved(screen.getByRole('dialog'));

  //It is deleted successfully
  userEvent.click(screen.getByTitle(/delete/i));
  expect(
    screen.getByText(/are you sure you want to delete this job\?/i)
  ).toBeVisible();
  userEvent.click(
    screen.getByRole('button', {
      name: /delete/i,
    })
  );
  expect(screen.queryByText(companyName)).toBeNull();
});
