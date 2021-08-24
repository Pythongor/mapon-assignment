import { combineReducers, Reducer, CombinedState } from "redux";

import { UnitsStateType } from "ducks/units/types";

import UnitsReducer from "ducks/units/reducer";

import { UnitsActionType } from "ducks/units/types";

export type StateType = {
  units: UnitsStateType;
};

export type ActionType = UnitsActionType;

const rootReducer: Reducer<
  CombinedState<StateType>,
  ActionType
> = combineReducers({
  units: UnitsReducer,
});

export default rootReducer;
