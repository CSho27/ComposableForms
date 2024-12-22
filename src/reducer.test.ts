import { describe, it, expect } from '@jest/globals';
import { BaseExtendableReducer } from './reducer';
import { ExtendedAction } from './extendableReducer/actions';

describe('Reducer', () => {
  const initialState: TestState = { name: null, quantity: 1 };

  describe('update', () => {
    it('Should update property using intrinstic action', () => {
      const result = BaseExtendableReducer(
        initialState,
        { type: 'reset' },
        TestIndependentReducer
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

export function TestIndependentReducer(
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

export function TestExtendableReducer(
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
    case 'update':
      return {
        ...state,
        name: action.property === 'name' ? action.value : state.name,
        quantity:
          action.property === 'name' ? state.quantity + 1 : action.value,
      };
  }
}
