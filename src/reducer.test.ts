import { describe, it, expect } from '@jest/globals';
import {
  BaseExtendableReducer,
  ExtendedAction,
  ExtendedReducer,
} from './reducer';

describe('Reducer', () => {
  const initialState: TestState = { name: null, quantity: 1 };

  describe('update', () => {
    it('Should update a property', () => {
      const result = BaseExtendableReducer(
        initialState,
        { type: 'update', property: 'name', value: '' },
        TestStateReducer
      );
      expect(result.name).toBe('Chris');
    });
  });
});

export interface TestState {
  name: string | null;
  quantity: number;
}

export type TestStateAction = { type: 'reset' };

export function TestStateReducer(
  state: TestState,
  action: ExtendedAction<TestState, TestStateAction>
): TestState | undefined {
  switch (action.type) {
    case 'reset':
      return {
        ...state,
        name: null,
        quantity: 1,
      };
  }
}

export function TestStateReducer2(
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
  }
}

const action: ExtendedAction<TestState, TestStateAction> = { type: 'reset' };

TestStateReducer({ name: '', quantity: 0 }, { type: 'reset' });
