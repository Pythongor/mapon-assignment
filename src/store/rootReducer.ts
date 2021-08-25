import { combineReducers, Reducer, CombinedState } from "redux";

import { RouteStateType } from "ducks/route/types";

import UnitsReducer from "ducks/route/reducer";

import { RouteActionType } from "ducks/route/types";

export type StateType = {
  route: RouteStateType;
};

export type ActionType = RouteActionType;

const rootReducer: Reducer<
  CombinedState<StateType>,
  ActionType
> = combineReducers({
  route: UnitsReducer,
});

export default rootReducer;
