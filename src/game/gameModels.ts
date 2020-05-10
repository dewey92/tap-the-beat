export interface Song {
  id: string;
  title: string;
  artworkUrl: string;
  bpm: number;
  youtubeUrl: string; // youtube
  meter: string;
  publisher: string;
}

export interface PlayerRecord {
  id: string;
  name: string;
  songId: string;
  score: number;
}

export type Leaderboard = PlayerRecord[];

export type HitPoint =
  | { type: 'Excellent'; point: 10 }
  | { type: 'Good'; point: 5 }
  | { type: 'Miss'; point: 0 };

export const excellent = (): HitPoint => ({ type: 'Excellent', point: 10 });
export const good = (): HitPoint => ({ type: 'Good', point: 5 });
export const miss = (): HitPoint => ({ type: 'Miss', point: 0 });

const isExcellent = (diff: number) => diff <= 80;
const isGood = (diff: number) => 81 <= diff && diff <= 120;

export const calculateHitPoint = (diff: number) => {
  if (isExcellent(diff)) return excellent();
  if (isGood(diff)) return good();
  return miss();
};

export enum Comment {
  NoComment,
  TooEarly,
  Excellent,
  Good,
}

export const feedbackMessage = (hitPoint: HitPoint) => {
  switch (hitPoint.type) {
    case 'Excellent':
      return Comment.Excellent;
    case 'Good':
      return Comment.Good;
    default:
      return Comment.NoComment;
  }
};
