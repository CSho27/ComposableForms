import { Action, Path, State } from './../types';

export type IntrinsicAction<TState extends State> = PropertyAction<TState>;
export type PropertyAction<TState extends State> = {
  [P in Path<TState>]: {
    type: 'update';
    property: P;
    value: TState[P];
  };
}[Path<TState>];

export function isPropertyAction<TState extends State>(
  state: TState,
  action: Action
): action is PropertyAction<TState> {
  if (action.type !== 'update') return false;
  const propertyAction = action as PropertyAction<TState>;
  const isValidProperty = Object.keys(state).some(
    k => k === propertyAction.property
  );
  const hasValue = Object.keys(action).some(k => k === 'value');
  return isValidProperty && hasValue;
}

export type ExtendedAction<TState extends State, TAction extends Action> =
  | TAction
  | IntrinsicAction<TState>;
