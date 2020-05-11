import React from 'react';
import { Router, Switch, Route } from 'react-router-dom';
import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { advanceTo, clear } from 'jest-date-mock';
import { ok } from '../shared';
import * as apis from '../game/gameApis';
import SaveForm from './SaveForm';
import { SongsProvider } from './SongsProvider';
import { taikatalvi, getMockedSongs, getMockedLeaderboard } from './gameMockedData';

jest.mock('../game/gameApis');
const mockedApis = apis as jest.Mocked<typeof apis>;
mockedApis.getSongs.mockResolvedValue(ok(getMockedSongs()));
mockedApis.getLeaderboard.mockResolvedValue(ok(getMockedLeaderboard()));

test('fills form to save leaderboard', async () => {
  const firstOfJanuary = new Date(2020, 1, 1, 0, 0, 0); // 1 Jan 2020
  advanceTo(firstOfJanuary);

  const history = createMemoryHistory({});
  history.push('/save', { score: 100, songId: taikatalvi.id });

  render(
    <Router history={history}>
      <Switch>
        <Route path="/save">
          <SongsProvider>
            <SaveForm />
          </SongsProvider>
        </Route>
      </Switch>
    </Router>
  );

  fireEvent.change(screen.getByLabelText('Your name'), { target: { value: 'John' } });
  fireEvent.click(screen.getByText('SUBMIT'));

  // Wait until leaderboard is fully loaded
  await waitFor(() => screen.getByText('Patrick Star'));

  expect(mockedApis.submitLeaderboard).toBeCalledWith({
    id: firstOfJanuary.getTime().toString(),
    name: 'John',
    score: 100,
    songId: taikatalvi.id,
  });

  const backButton = await screen.findByText('Play another song');
  expect(backButton).toBeInTheDocument();

  clear();
});
