import { Path, State } from '../types';

export type PropertyAction<TState extends State> = {
  [P in Path<TState>]: {
    type: 'update';
    property: P;
    value: TState[P];
  };
}[Path<TState>];

export function propertyUpdateReducer<TState extends State>(
  state: TState,
  action: PropertyAction<TState>
) {
  return {
    ...state,
    [action.property]: action.value,
  };
}
