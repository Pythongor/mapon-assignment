import { ActionType } from "typesafe-actions";
import * as actions from "./actions";

export type UnitType = {
  [key: string]: unknown;
  number: string;
  unit_id: number;
};

export type StatusType = "none" | "pending" | "ok" | "error";

export type UnitsStateType = {
  units: UnitType[];
  status: StatusType;
};

export enum Actions {
  setVehicles = "UNITS_SET_VEHICLES",
  setStatus = "UNITS_SET_STATUS",
}

export type UnitsActionType = ActionType<typeof actions>;
