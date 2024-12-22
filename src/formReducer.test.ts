import { describe, it, expect } from "@jest/globals";
import { FormAction, FormStateReducer } from "./formReducer";

describe("formReducer", () => {
  const initialState: TestState = { name: null, quantity: 1 };

  describe("update", () => {
    it("Should update a property", () => {
      const result = FormStateReducer(initialState, {
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
