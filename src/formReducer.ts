export type State = Record<string, any>;
export type Path<TState> = Extract<keyof TState, string>;
export type PathValue<TState, TPath extends Path<TState>> = TState[TPath];

export interface FormState<TState extends State> {
  state: TState;
}

export type FormAction<TState> = PropertyAction<TState>;

export interface Action {
  type: string;
}

export type PropertyAction<TState> = Action &
  {
    [K in Path<TState>]: { type: "update"; property: K; value: TState[K] };
  }[Path<TState>];

export function FormStateReducer<
  TState extends State,
  TAction extends FormAction<TState>
>(state: TState, action: TAction): TState {
  switch (action.type) {
    case "update":
      return {
        ...state,
        [action.property]: action.value,
      };
  }
}
