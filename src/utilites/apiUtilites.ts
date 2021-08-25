import {
  RouteResponseType,
  RouteFromAPIType,
  PointType,
} from "ducks/route/types";

export const prepareRoutes = (
  data: RouteResponseType
): { startPoint: PointType; endPoint: PointType } => {
  const { routes } = data.units[0];
  const { startPoint, endPoint } = getRouteEnds(routes);
  return { startPoint, endPoint };
};

export const getRouteEnds = (routes: RouteFromAPIType[]) => {
  const start = routes[0].start;
  const end = routes[routes.length - 1].start;
  const startPoint = { lng: start.lng, lat: start.lat };
  const endPoint = { lng: end.lng, lat: end.lat };
  return { startPoint, endPoint };
};
