import { createAction } from "typesafe-actions";
import { Actions, StatusType, UnitType } from "./types";

export const setVehicles = createAction(Actions.setVehicles)<UnitType[]>();

export const setStatus = createAction(Actions.setStatus)<StatusType>();
