import { ActionType } from "typesafe-actions";
import * as actions from "./actions";

export type UnitType = {
  number: string;
  unit_id: number;
};

export type RouteType = {
  start: { lat: number; lng: number };
  end: { lat: number; lng: number };
};

export type StatusType = "none" | "pending" | "ok" | "error";

export type RouteStateType = {
  units: UnitType[];
  vehiclesStatus: StatusType;
  routesStatus: StatusType;
  selectedUnitId: number | null;
  from: string | null;
  to: string | null;
  routes: RouteType[];
};

export enum Actions {
  setVehicles = "ROUTE_SET_VEHICLES",
  setVehiclesStatus = "ROUTE_SET_VEHICLES_STATUS",
  setRoutesStatus = "ROUTE_SET_ROUTES_STATUS",
  setUnitId = "ROUTE_SET_SELECTED_UNIT_ID",
  setFromDate = "ROUTE_SET_FROM_DATE",
  setToDate = "ROUTE_SET_TO_DATE",
  setRoutes = "ROUTE_SET_ROUTES",
}

export type RouteActionType = ActionType<typeof actions>;
