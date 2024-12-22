import { ExtendedAction, isPropertyAction } from './extendableReducer/actions';
import { Action, State } from './types';

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
    case 'update':
      if (!isPropertyAction(state, action))
        throw new Error('Invalid update action.');

      return {
        ...state,
        [action.property]: action.value,
      };
    default:
      console.warn('Action fell through. No operation will be performed.');
      return state;
  }
}
