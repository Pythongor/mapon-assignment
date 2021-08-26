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
  kilometers: number;
  drivingTime: number;
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

const getMovingRoutes = (routes: RouteFromAPIType[]) => {
  return routes.filter(({ type }) => type === "route");
};

export const getRoutePoints = (routes: RouteFromAPIType[]) => {
  const movingRoutes = getMovingRoutes(routes);
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
  const south = Math.min(...latitudes);
  const west = Math.min(...longitudes);
  const north = Math.max(...latitudes);
  const east = Math.max(...longitudes);
  return {
    south: south - (north - south) * 0.05,
    west: west - (east - west) * 0.05,
    north: north + (north - south) * 0.05,
    east: east + (east - west) * 0.05,
  };
};

export const getKMDriven = (routes: RouteFromAPIType[]) => {
  const movingRoutes = getMovingRoutes(routes);
  const distance = movingRoutes.reduce(
    (distanceAccumulator, currentDistance) =>
      distanceAccumulator + currentDistance.distance,
    0
  );
  return distance / 1000;
};

export const getDrivingTime = (routes: RouteFromAPIType[]) => {
  const movingRoutes = getMovingRoutes(routes);
  const routesTimes = movingRoutes.map(
    ({ start: { time: startTime }, end: { time: endTime } }) => [
      startTime,
      endTime,
    ]
  );
  const routesTimeDeltas = routesTimes.map(
    ([start, end]) => new Date(end).getTime() - new Date(start).getTime()
  );
  const drivingTime = routesTimeDeltas.reduce(
    (deltaAccumulator, currentDelta) => deltaAccumulator + currentDelta,
    0
  );
  return drivingTime;
};

export const parseRoutes = (data: RouteResponseType): PreparedDataType => {
  const { routes } = data.units[0];
  const { startPoint, endPoint } = getRouteEnds(routes);
  const kilometers = getKMDriven(routes);
  const drivingTime = getDrivingTime(routes);
  const points = getRoutePoints(routes);
  const bounds = getBounds(points);
  return { startPoint, endPoint, points, bounds, kilometers, drivingTime };
};
