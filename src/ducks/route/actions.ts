import { createAction } from "typesafe-actions";
import { Actions, StatusType, UnitType } from "./types";

export const setVehicles = createAction(Actions.setVehicles)<UnitType[]>();

export const setStatus = createAction(Actions.setStatus)<StatusType>();

export const setUnitId = createAction(Actions.setUnitId)<number | null>();

export const setFromDate = createAction(Actions.setFromDate)<string | null>();

export const setToDate = createAction(Actions.setToDate)<string | null>();
