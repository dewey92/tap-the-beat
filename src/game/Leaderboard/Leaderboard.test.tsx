import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import * as apis from '../gameApis';
import { ok } from '../../shared';
import { getMockedSongs, getMockedLeaderboard } from '../gameMockedData';
import { SongsProvider } from '../SongsProvider';
import Leaderboard from './Leaderboard';

jest.mock('../gameApis');
const mockedApis = apis as jest.Mocked<typeof apis>;
mockedApis.getSongs.mockResolvedValue(ok(getMockedSongs()));
mockedApis.getLeaderboard.mockResolvedValue(ok(getMockedLeaderboard()));

test('shows leaderboard list', async () => {
  render(
    <Router>
      <SongsProvider>
        <Leaderboard />
      </SongsProvider>
    </Router>
  );

  await screen.findByText('Patrick Star');
  expect(screen.getByText('Patrick Star')).toBeInTheDocument();
  expect(screen.getByText('Sponge Bob')).toBeInTheDocument();
  expect(screen.getByText('Squid Ward')).toBeInTheDocument();
});
