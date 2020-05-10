// import axios from 'axios';
import { Song, Leaderboard, PlayerRecord } from './gameModels';
import { Result, ok, err } from '../shared';
import { getMockedSongs, getMockedLeaderboard } from './gameMockedData';

const LS_KEY = 'tap-the-beat:leaderboard';

/**
 * Get all preset songs. Fake call
 */
export async function getSongs(): Promise<Result<Song[], string>> {
  try {
    const data = await Promise.resolve(getMockedSongs());
    return ok(data);
  } catch (e) {
    return err('Oops! Failed to load preset songs');
  }
}

/**
 * Get song chord based on ID. Fake call
 */
export async function getChord(songId: string): Promise<Result<Song, string>> {
  try {
    const presetSongs = getMockedSongs();
    const data = await Promise.resolve(presetSongs.find((s) => s.id === songId));

    if (!data) return err('Cannot find this song');
    return ok(data);
  } catch (e) {
    return err('Oops! Cannot get chord for this song');
  }
}

/**
 * Get a list of leaderboard. Under the hood, it just merges what's there in Local Storage
 * with a mocked data
 */
export async function getLeaderboard(): Promise<Result<Leaderboard, string>> {
  return new Promise((resolve) => {
    try {
      const leaderboard = JSON.parse(localStorage.getItem(LS_KEY) || '[]') as Leaderboard;
      setTimeout(() => {
        resolve(ok(getMockedLeaderboard().concat(leaderboard)));
      }, 1500);
    } catch (e) {
      return err('Failed retrieving leaderboard');
    }
  });
}

/**
 * Save the payload in local storage
 */
export async function submitLeaderboard(
  payload: PlayerRecord
): Promise<Result<PlayerRecord, string>> {
  try {
    const leaderboard = JSON.parse(localStorage.getItem(LS_KEY) || '[]') as Leaderboard;
    const newData = leaderboard.concat(payload);
    localStorage.setItem(LS_KEY, JSON.stringify(newData));

    return ok(payload);
  } catch (e) {
    return err('Unknown error');
  }
}
