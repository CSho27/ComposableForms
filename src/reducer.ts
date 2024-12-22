export type State = Record<string, any>;
export type Path<TState> = Extract<keyof TState, string>;
export type Action = {
  type: string;
};

export type IntrinsicAction<TState extends State> = PropertyAction<TState>;
export type PropertyAction<TState extends State> = {
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

export type ExtendedAction<TState extends State, TAction extends Action> =
  | TAction
  | IntrinsicAction<TState>;

export type IndependentReducer<TState extends State, TAction extends Action> = (
  state: TState,
  action: TAction
) => TState;
export type ExtendedReducer<TState extends State, TAction extends Action> = (
  state: TState,
  action: TAction
) => TState | undefined;

export type ExtendableReducer<
  TState extends State,
  TAction extends Action
> = TAction extends ExtendedAction<TState, TAction>
  ? ExtendedReducer<TState, TAction>
  : IndependentReducer<TState, TAction>;

export function BaseExtendableReducer<
  TState extends State,
  TAction extends Action
>(
  state: TState,
  action: TAction,
  reducer?: ExtendableReducer<TState, TAction>
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
