import { reducer as gameEngineReducer } from './useGameEngine';
import { Comment } from '../gameModels';

test('stores time information on beat', () => {
  const finalState = gameEngineReducer(undefined!, { type: 'ON_BEAT', payload: 1 });
  expect(finalState.currentBeatTime).toEqual(1);
});

test('detects too early space hit within a beat interval', () => {
  const state1 = gameEngineReducer(undefined!, { type: 'ON_BEAT', payload: 1 });
  const state2 = gameEngineReducer(state1, { type: 'ON_SPACE_HIT', payload: 2 });
  const finalState = gameEngineReducer(state2, { type: 'ON_SPACE_HIT', payload: 3 });

  expect(finalState.comment).toEqual(Comment.TooEarly);
});

test('produces excellent point when user hits space within < 80ms after beat', () => {
  const state1 = gameEngineReducer(undefined!, { type: 'ON_BEAT', payload: 100 });
  const finalState = gameEngineReducer(state1, { type: 'ON_SPACE_HIT', payload: 160 });

  expect(finalState.comment).toEqual(Comment.Excellent);
});

test('produces good point when user hits space within 81-120ms after beat', () => {
  const state1 = gameEngineReducer(undefined!, { type: 'ON_BEAT', payload: 100 });
  const finalState = gameEngineReducer(state1, { type: 'ON_SPACE_HIT', payload: 210 });

  expect(finalState.comment).toEqual(Comment.Good);
});

test('produces no point when user hits space within >120ms after beat', () => {
  const state1 = gameEngineReducer(undefined!, { type: 'ON_BEAT', payload: 100 });
  const finalState = gameEngineReducer(state1, { type: 'ON_SPACE_HIT', payload: 250 });

  expect(finalState.comment).toEqual(Comment.NoComment);
});
