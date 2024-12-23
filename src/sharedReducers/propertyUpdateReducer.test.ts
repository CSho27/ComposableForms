import { describe, it, expect } from '@jest/globals';
import { propertyUpdateReducer } from './propertyUpdateReducer';

describe('propertyUpdateReducer', () => {
  const initialState: TestState = { name: null, quantity: 1 };

  describe('update', () => {
    it('Should update property for intrinstic action', () => {
      const result = propertyUpdateReducer(initialState, {
        type: 'update',
        property: 'name',
        value: 'Chris',
      });
      expect(result.name).toBe('Chris');
    });
  });
});

export interface TestState {
  name: string | null;
  quantity: number;
}
