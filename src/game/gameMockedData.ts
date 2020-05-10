import { PlayerRecord, Song } from './gameModels';

export const taikatalvi: Song = {
  id: 'youtube:6TNrEaxVzaU',
  title: 'Nightwish - Taikatalvi (With Lyrics)',
  publisher: 'Nightwish Imaginaerum',
  meter: '3/4',
  artworkUrl: 'https://i.ytimg.com/vi/6TNrEaxVzaU/maxresdefault.jpg',
  youtubeUrl: 'https://www.youtube.com/watch?v=6TNrEaxVzaU',
  bpm: 120,
};

export const soldiersPoem: Song = {
  id: 'youtube:aVrK9_R2f2Q',
  title: "Soldier's Poem",
  publisher: 'Muse - Topic',
  meter: '4/4',
  artworkUrl: 'https://i.ytimg.com/vi/aVrK9_R2f2Q/maxresdefault.jpg',
  youtubeUrl: 'https://www.youtube.com/watch?v=aVrK9_R2f2Q',
  bpm: 70,
};

export const cancer: Song = {
  id: 'youtube:wc2s9skF_58',
  title: 'My Chemical Romance - Cancer',
  publisher: 'My Chemical Romance',
  meter: '4/4',
  artworkUrl: 'https://i.ytimg.com/vi/wc2s9skF_58/maxresdefault.jpg',
  youtubeUrl: 'https://www.youtube.com/watch?v=wc2s9skF_58',
  bpm: 75,
};

export const herMajesty: Song = {
  id: 'youtube:Mh1hKt5kQ_4',
  title: 'Her Majesty (Remastered 2009)',
  publisher: 'The Beatles - Topic',
  meter: '4/4',
  artworkUrl: 'https://i.ytimg.com/vi/Mh1hKt5kQ_4/maxresdefault.jpg',
  youtubeUrl: 'https://www.youtube.com/watch?v=Mh1hKt5kQ_4',
  bpm: 200,
};

const squidward: PlayerRecord = {
  id: 'leaderboard:1',
  name: 'Squid Ward',
  songId: herMajesty.id,
  score: 200,
};
const spongebob: PlayerRecord = {
  id: 'leaderboard:2',
  name: 'Sponge Bob',
  songId: herMajesty.id,
  score: 225,
};
const patrick: PlayerRecord = {
  id: 'leaderboard:2',
  name: 'Patrick Star',
  songId: taikatalvi.id,
  score: 360,
};

export const getMockedSongs = () => [taikatalvi, soldiersPoem, cancer, herMajesty];
export const getMockedLeaderboard = () => [squidward, spongebob, patrick];
