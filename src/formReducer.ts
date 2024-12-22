import { PropertyAction, State } from "./reducer";

export interface FormState<TState extends State> {
  state: TState;
}

export type FormAction<TState> = PropertyAction<TState>;

export function FormStateReducer<
  TState extends State,
  TAction extends FormAction<TState>
>(state: TState, action: TAction): TState {
  return state;
}
