import { describe, it, expect } from "@jest/globals";
import { ComposableAction, ComposableStateReducer } from "./reducer";

describe("Reducer", () => {
  const initialState: TestState = { name: null, quantity: 1 };

  describe("update", () => {
    it("Should update a property", () => {
      const result = ComposableStateReducer(
        initialState,
        {
          type: "update",
          property: "name",
          value: "Chris",
        },
        TestStateReducer
      );
      expect(result.name).toBe("Chris");
    });
  });
});

export interface TestState {
  name: string | null;
  quantity: number;
}

export type TestStateAction = { type: "reset" };

export function TestStateReducer(
  state: TestState,
  action: ComposableAction<TestState, TestStateAction>
): TestState | undefined {
  switch (action.type) {
    case "reset":
      return {
        ...state,
        name: null,
        quantity: 1,
      };
  }
}
