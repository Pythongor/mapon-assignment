import { ActionType } from "typesafe-actions";
import * as actions from "./actions";

export type UnitType = {
  [key: string]: unknown;
  number: string;
  unit_id: number;
};

export type StatusType = "none" | "pending" | "ok" | "error";

export type RouteStateType = {
  units: UnitType[];
  status: StatusType;
  selectedUnitId: number | null;
  from: string | null;
  to: string | null;
};

export enum Actions {
  setVehicles = "ROUTE_SET_VEHICLES",
  setStatus = "ROUTE_SET_STATUS",
  setUnitId = "ROUTE_SET_SELECTED_UNIT_ID",
  setFromDate = "ROUTE_SET_FROM_DATE",
  setToDate = "ROUTE_SET_TO_DATE",
}

export type RouteActionType = ActionType<typeof actions>;
