export type State = Record<string, any>;
export type Path<TState> = Extract<keyof TState, string>;
export type Action = {
  type: string;
};
