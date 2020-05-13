import { calculateHitPoint, HitPoint, tooEarly } from '../gameModels';
import { Reducer, useReducer } from 'react';

type DateInMilliseconds = number;
type BeatTime = DateInMilliseconds;

type State = {
  accumulatedScore: number;
  currentBeatTime: BeatTime;
  hitHistory: [BeatTime, HitPoint][];
};

type Actions =
  | { type: 'RECORD_BEAT'; payload: DateInMilliseconds }
  | { type: 'CALCULATE_SCORE'; payload: DateInMilliseconds };

const initialState: State = {
  accumulatedScore: 0,
  currentBeatTime: 0,
  hitHistory: [],
};

export const reducer: Reducer<State, Actions> = (state = initialState, action) => {
  switch (action.type) {
    case 'RECORD_BEAT': {
      return {
        ...state,
        currentBeatTime: action.payload,
      };
    }
    case 'CALCULATE_SCORE': {
      const { currentBeatTime, hitHistory } = state;
      const now = action.payload;
      const diff = now - currentBeatTime;

      // Inspect the beat-time the last time you hit the space, if it's the same as the current beat-time,
      // means you're hitting space more than once within the beat interval. In that case, you are
      // considered hitting space too early
      const [lastBeatTime] = hitHistory[hitHistory.length - 1] || [];
      const hitSpaceTooEarly = lastBeatTime === currentBeatTime;
      if (hitSpaceTooEarly) {
        return {
          ...state,
          hitHistory: state.hitHistory.concat([[currentBeatTime, tooEarly()]]),
        };
      }

      const currentHit = calculateHitPoint(diff);
      return {
        ...state,
        hitHistory: state.hitHistory.concat([[currentBeatTime, currentHit]]),
        accumulatedScore: state.accumulatedScore + currentHit.point,
      };
    }
    default:
      return state;
  }
};

const useGameEngine = () => useReducer(reducer, initialState);

/**
 * A selector function to get the current hit from state. Technically it's just
 * the last item of `hitHistory`
 */
export const getCurrentHit = (state: State): HitPoint | undefined => {
  const { hitHistory } = state;
  const [, currentHit] = hitHistory[hitHistory.length - 1] || [];

  return currentHit;
};

export default useGameEngine;
