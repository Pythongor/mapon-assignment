import { createReducer } from "typesafe-actions";
import { RouteActionType, RouteStateType } from "./types";
import {
  setVehicles,
  setStatus,
  setUnitId,
  setFromDate,
  setToDate,
} from "./actions";

const initialState: Readonly<RouteStateType> = {
  status: "none",
  units: [],
  selectedUnitId: null,
  from: null,
  to: null,
};

export default createReducer<RouteStateType, RouteActionType>(initialState)
  .handleAction(setVehicles, (state, { payload }) => ({
    ...state,
    units: payload,
  }))
  .handleAction(setStatus, (state, { payload }) => ({
    ...state,
    status: payload,
  }))
  .handleAction(setUnitId, (state, { payload }) => ({
    ...state,
    selectedUnitId: payload,
  }))
  .handleAction(setFromDate, (state, { payload }) => ({
    ...state,
    from: `${payload}T00:00:00Z`,
  }))
  .handleAction(setToDate, (state, { payload }) => ({
    ...state,
    to: `${payload}T00:00:00Z`,
  }));
