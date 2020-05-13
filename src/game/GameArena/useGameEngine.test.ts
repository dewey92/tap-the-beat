import { reducer as gameEngineReducer, getCurrentHit } from './useGameEngine';
import { tooEarly, excellent, good, miss } from '../gameModels';

test('stores time information on beat', () => {
  const finalState = gameEngineReducer(undefined!, { type: 'RECORD_BEAT', payload: 1 });

  expect(finalState.currentBeatTime).toEqual(1);
  expect(getCurrentHit(finalState)).toBeUndefined();
});

test('detects too early space hit within a beat interval', () => {
  const state1 = gameEngineReducer(undefined!, { type: 'RECORD_BEAT', payload: 1 });
  const state2 = gameEngineReducer(state1, { type: 'CALCULATE_SCORE', payload: 2 });
  const finalState = gameEngineReducer(state2, { type: 'CALCULATE_SCORE', payload: 3 });

  expect(getCurrentHit(finalState)).toEqual(tooEarly());
});

test('produces excellent point when user hits space within < 80ms after beat', () => {
  const state1 = gameEngineReducer(undefined!, { type: 'RECORD_BEAT', payload: 100 });
  const finalState = gameEngineReducer(state1, { type: 'CALCULATE_SCORE', payload: 160 });

  expect(getCurrentHit(finalState)).toEqual(excellent());
});

test('produces good point when user hits space within 81-120ms after beat', () => {
  const state1 = gameEngineReducer(undefined!, { type: 'RECORD_BEAT', payload: 100 });
  const finalState = gameEngineReducer(state1, { type: 'CALCULATE_SCORE', payload: 210 });

  expect(getCurrentHit(finalState)).toEqual(good());
});

test('produces no point when user hits space within >120ms after beat', () => {
  const state1 = gameEngineReducer(undefined!, { type: 'RECORD_BEAT', payload: 100 });
  const finalState = gameEngineReducer(state1, { type: 'CALCULATE_SCORE', payload: 250 });

  expect(getCurrentHit(finalState)).toEqual(miss());
});
