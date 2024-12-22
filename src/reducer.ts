export type State = Record<string, any>;
export type Path<TState> = Extract<keyof TState, string>;
export type Action = {
  type: string;
};

export type PropertyAction<TState> = {
  [P in Path<TState>]: {
    type: "update";
    property: P;
    value: TState[P];
  };
}[Path<TState>];

export function isPropertyAction<TState extends State>(
  state: TState,
  action: Action
): action is PropertyAction<TState> {
  if (action.type !== "update") return false;
  const propertyAction = action as PropertyAction<TState>;
  const isValidProperty = Object.keys(state).some(
    (k) => k === propertyAction.property
  );
  return isValidProperty;
}

export type ComposableAction<TState extends State, TAction extends Action> =
  | TAction
  | PropertyAction<TState>;
export type ComposableReducer<TState extends State, TAction extends Action> = (
  state: TState,
  action: ComposableAction<TState, TAction>
) => TState | undefined;

export function ComposableStateReducer<
  TState extends State,
  TAction extends Action
>(
  state: TState,
  action: ComposableAction<TState, TAction>,
  reducer?: ComposableReducer<TState, TAction>
): TState {
  const updatedState = reducer?.(state, action);
  if (updatedState !== undefined) return updatedState;

  switch (action.type) {
    case "update":
      if (!isPropertyAction(state, action))
        throw new Error("Invalid update action.");

      return {
        ...state,
        [action.property]: action.value,
      };
    default:
      console.warn("Action fell through. No operation will be performed.");
      return state;
  }
}
