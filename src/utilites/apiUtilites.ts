import {
  RouteResponseType,
  RouteFromAPIType,
  PointType,
  BoundsType,
} from "ducks/route/types";

type AccumulatorType = {
  prevElement: { lat: number | null; lng: number | null };
  nonUnique: number[];
};

type PreparedDataType = {
  startPoint: PointType;
  endPoint: PointType;
  points: PointType[];
  bounds: BoundsType;
};

const getNoRepeatPoints = (points: PointType[]) => {
  const { nonUnique } = points.reduce(
    (accumulator: AccumulatorType, current, index) => {
      const sameLat = current.lat === accumulator.prevElement.lat;
      const sameLng = current.lng === accumulator.prevElement.lng;
      if (sameLat && sameLng) {
        accumulator.nonUnique.push(index);
      }
      return accumulator;
    },
    { prevElement: { lat: null, lng: null }, nonUnique: [] }
  );
  const uniquePoints = points.filter(
    (point, index) => !nonUnique.includes(index)
  );
  return uniquePoints;
};

export const getRoutePoints = (routes: RouteFromAPIType[]) => {
  const movingRoutes = routes.filter(({ type }) => type === "route");
  const points = movingRoutes.map(({ decoded_route }) =>
    decoded_route ? decoded_route.points : []
  );
  const flattedPoints = points.flat();
  const preparedPoints = flattedPoints.map(({ lng, lat }) => ({ lng, lat }));
  const uniquePoints = getNoRepeatPoints(preparedPoints);
  return uniquePoints;
};

export const getRouteEnds = (routes: RouteFromAPIType[]) => {
  const start = routes[0].start;
  const end = routes[routes.length - 1].start;
  const startPoint = { lng: start.lng, lat: start.lat };
  const endPoint = { lng: end.lng, lat: end.lat };
  return { startPoint, endPoint };
};

export const getBounds = (
  points: PointType[]
): { east: number; west: number; south: number; north: number } => {
  const longitudes = points.map(({ lng }) => lng);
  const latitudes = points.map(({ lat }) => lat);
  return {
    south: Math.min(...latitudes) - 0.01,
    west: Math.min(...longitudes) - 0.01,
    north: Math.max(...latitudes) + 0.01,
    east: Math.max(...longitudes) + 0.01,
  };
};

export const parseRoutes = (data: RouteResponseType): PreparedDataType => {
  const { routes } = data.units[0];
  const { startPoint, endPoint } = getRouteEnds(routes);
  const points = getRoutePoints(routes);
  const bounds = getBounds(points);
  return { startPoint, endPoint, points, bounds };
};
