import { Reducer } from 'react';
import {
  isPropertyAction,
  PropertyAction,
} from './src/extendableReducer/actions';
import { Action, State } from './src/types';

export interface TestState {
  name: string | null;
  quantity: number;
}

export type TestStateAction = PropertyAction<TestState> | { type: 'reset' };

export function TestStateReducer(
  state: TestState,
  action: TestStateAction
): TestState {
  switch (action.type) {
    case 'reset':
      return {
        ...state,
        name: null,
        quantity: 1,
      };
    case 'update':
      return setProperty(state, action);
  }
}

function setProperty<TState extends State>(
  state: TState,
  action: PropertyAction<TState>
) {
  if (!isPropertyAction(state, action)) return state;
  return {
    ...state,
    [action.property]: action.value,
  };
}

function reduce<TState extends State, TAction extends Action>(
  state: TState,
  action: TAction,
  ...reducers: Reducer<TState, Action>[]
): TState {
  reducers.forEach(r => {
    state = r(state, action);
  });
  return state;
}
