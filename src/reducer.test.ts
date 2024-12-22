import { describe, it, expect } from "@jest/globals";
import { Reducer } from "./reducer";

describe("Reducer", () => {
  const initialState: TestState = { name: null, quantity: 1 };

  describe("update", () => {
    it("Should update a property", () => {
      const result = Reducer(initialState, {
        type: "update",
        property: "name",
        value: "Chris",
      });
      expect(result.name).toBe("Chris");
    });
  });
});

export interface TestState {
  name: string | null;
  quantity: number;
}
