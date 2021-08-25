import { createAction } from "typesafe-actions";
import { Actions, StatusType, UnitType, RouteResponseType } from "./types";

export const setVehicles = createAction(Actions.setVehicles)<UnitType[]>();

export const setVehiclesStatus = createAction(
  Actions.setVehiclesStatus
)<StatusType>();

export const setRoutesStatus = createAction(
  Actions.setRoutesStatus
)<StatusType>();

export const setUnitId = createAction(Actions.setUnitId)<number | null>();

export const setFromDate = createAction(Actions.setFromDate)<string | null>();

export const setToDate = createAction(Actions.setToDate)<string | null>();

export const setRoutes = createAction(Actions.setRoutes)<string | null>();

export const setRouteEnds = createAction(
  Actions.setRouteEnds
)<RouteResponseType>();
