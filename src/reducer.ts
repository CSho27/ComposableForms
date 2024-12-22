export type State = Record<string, any>;
export type Path<TState> = Extract<keyof TState, string>;

export interface Action {
  type: string;
}

export type PropertyAction<TState> = Action &
  {
    [P in Path<TState>]: {
      type: "update";
      property: P;
      value: TState[P];
    };
  }[Path<TState>];

export function Reducer<TState extends State>(
  state: TState,
  action: PropertyAction<TState>
) {
  switch (action.type) {
    case "update":
      return {
        ...state,
        [action.property]: action.value,
      };
  }
}
