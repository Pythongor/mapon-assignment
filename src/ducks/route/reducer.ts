import { createReducer } from "typesafe-actions";
import { RouteActionType, RouteStateType } from "./types";
import {
  setVehicles,
  setVehiclesStatus,
  setRoutesStatus,
  setUnitId,
  setFromDate,
  setToDate,
  setRouteEnds,
  setPoints,
  setBounds,
} from "./actions";

const initialState: Readonly<RouteStateType> = {
  vehiclesStatus: "none",
  routesStatus: "none",
  units: [],
  selectedUnitId: null,
  from: null,
  to: null,
  points: null,
  ends: null,
  bounds: null,
};

export default createReducer<RouteStateType, RouteActionType>(initialState)
  .handleAction(setVehicles, (state, { payload }) => ({
    ...state,
    units: payload,
  }))
  .handleAction(setVehiclesStatus, (state, { payload }) => ({
    ...state,
    vehiclesStatus: payload,
  }))
  .handleAction(setRoutesStatus, (state, { payload }) => ({
    ...state,
    routesStatus: payload,
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
  }))
  .handleAction(setRouteEnds, (state, { payload }) => ({
    ...state,
    ends: payload,
  }))
  .handleAction(setPoints, (state, { payload }) => ({
    ...state,
    points: payload,
  }))
  .handleAction(setBounds, (state, { payload }) => ({
    ...state,
    bounds: payload,
  }));
