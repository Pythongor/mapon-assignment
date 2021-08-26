import { ActionType } from "typesafe-actions";
import * as actions from "./actions";

export type UnitType = {
  number: string;
  unit_id: number;
};

export type PointType = { lat: number; lng: number };

export type RouteType = {
  start: PointType;
  end: PointType;
};

export type RouteFromAPIType = {
  type: "route" | "stop";
  route_id: number;
  start: { address: string; lat: number; lng: number; time: string };
  end: { time: string };
  decoded_route?: {
    points: { gmt: string; lat: number; lng: number; speed: number }[];
  };
  distance: number;
  avg_speed: number;
  [key: string]: unknown;
};

export type RouteResponseType = {
  units: {
    unit_id: number;
    routes: RouteFromAPIType[];
  }[];
};

export type BoundsType = {
  east: number;
  west: number;
  south: number;
  north: number;
};

export type TimeType = {
  hours: number;
  minutes: number;
};

export type StatusType = "none" | "pending" | "ok" | "error";

export type RouteStateType = {
  units: UnitType[];
  vehiclesStatus: StatusType;
  routesStatus: StatusType;
  selectedUnitId: number | null;
  from: string | null;
  to: string | null;
  points: PointType[] | null;
  ends: [PointType, PointType] | null;
  bounds: BoundsType | null;
  kilometers: number;
  drivingTime: number;
};

export enum Actions {
  setVehicles = "ROUTE_SET_VEHICLES",
  setVehiclesStatus = "ROUTE_SET_VEHICLES_STATUS",
  setRoutesStatus = "ROUTE_SET_ROUTES_STATUS",
  setUnitId = "ROUTE_SET_SELECTED_UNIT_ID",
  setFromDate = "ROUTE_SET_FROM_DATE",
  setToDate = "ROUTE_SET_TO_DATE",
  setPoints = "ROUTE_SET_ENCODED_POINTS",
  setRouteEnds = "ROUTE_SET_ROUTE_ENDS",
  setKilometers = "ROUTE_SET_ROUTE_KILOMETERS",
  setBounds = "ROUTE_SET_MAP_BOUNDS",
  setTime = "ROUTE_SET_DRIVING_TIME",
}

export type RouteActionType = ActionType<typeof actions>;
