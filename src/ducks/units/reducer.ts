import { createReducer } from "typesafe-actions";
import { UnitsActionType, UnitsStateType } from "./types";
import { setVehicles, setStatus } from "./actions";

const initialState: Readonly<UnitsStateType> = {
  status: "none",
  units: [],
};

export default createReducer<UnitsStateType, UnitsActionType>(initialState)
  .handleAction(setVehicles, (state, { payload }) => ({
    ...state,
    units: payload,
  }))
  .handleAction(setStatus, (state, { payload }) => ({
    ...state,
    status: payload,
  }));
