import { calculateHitPoint, feedbackMessage, Comment } from '../gameModels';
import { Reducer, useReducer } from 'react';

type Milliseconds = number;
type BeatTime = Milliseconds;
type HitTime = Milliseconds;

type State = {
  accumulatedScore: number;
  currentBeatTime: BeatTime;
  hitHistory: [BeatTime, HitTime][];
  comment: Comment;
};

type Actions =
  | { type: 'ON_BEAT'; payload: Milliseconds }
  | { type: 'ON_SPACE_HIT'; payload: Milliseconds };

const initialState: State = {
  accumulatedScore: 0,
  currentBeatTime: 0,
  hitHistory: [],
  comment: Comment.NoComment,
};

export const reducer: Reducer<State, Actions> = (state = initialState, action) => {
  switch (action.type) {
    case 'ON_BEAT': {
      return {
        ...state,
        currentBeatTime: action.payload,
      };
    }
    case 'ON_SPACE_HIT': {
      const { currentBeatTime, hitHistory } = state;
      const now = action.payload;
      const diff = now - currentBeatTime;

      const nextHitHistory = state.hitHistory.concat([[currentBeatTime, now]]);

      // Inspect the beat-time the last time you hit the space, if it's the same as the current beat-time,
      // means you're hitting space more than once within the beat interval. In that case, show
      // "Too early" message
      const lastSpaceHit = hitHistory[hitHistory.length - 1];
      const hitSpaceTooFast = lastSpaceHit !== undefined && lastSpaceHit[0] === currentBeatTime;
      if (hitSpaceTooFast) {
        return {
          ...state,
          comment: Comment.TooEarly,
          hitHistory: nextHitHistory,
        };
      }

      const currPoint = calculateHitPoint(diff);
      return {
        ...state,
        hitHistory: nextHitHistory,
        accumulatedScore: state.accumulatedScore + currPoint.point,
        comment: feedbackMessage(currPoint),
      };
    }
    default:
      return state;
  }
};

const useGameEngine = () => {
  return useReducer(reducer, initialState);
};

export default useGameEngine;
