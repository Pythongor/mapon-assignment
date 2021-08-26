import React, { useRef, useEffect, useState } from "react";
import { connect } from "react-redux";
import cn from "classnames";
import {
  GoogleMap,
  LoadScript,
  Marker,
  Polyline,
} from "@react-google-maps/api";
import { fitBounds } from "google-map-react";

// types
import { StateType } from "store/rootReducer";
import { PointType } from "ducks/route/types";

// assets
import Pin from "assets/images/pin.svg";
import styles from "./routeMap.module.scss";

const containerStyle = {
  width: "100%",
  height: "100%",
};

type StateProps = ReturnType<typeof MSTP>;
type DispatchProps = typeof MDTP;
type RouteMapType = StateProps & DispatchProps;

const RouteMap: React.FC<RouteMapType> = ({
  routesStatus,
  ends,
  points,
  bounds,
}) => {
  const ref = useRef<GoogleMap>(null);
  const [zoom, setZoom] = useState<number>(10);
  const [center, setCenter] = useState<PointType>({
    lat: 56.947034,
    lng: 24.10653,
  });

  useEffect(() => {
    if (ref.current && bounds) {
      const { north, east, south, west } = bounds;
      const fit = fitBounds(
        { ne: { lng: east, lat: north }, sw: { lng: west, lat: south } },
        { width: 600, height: 200 }
      );
      setCenter(fit.center);
      setZoom(fit.zoom);
    }
  }, [bounds]);
  return (
    <div
      className={cn(styles.wrapper, {
        [styles.wrapper_show]: ["ok", "pending"].includes(routesStatus),
      })}
    >
      {["ok", "pending"].includes(routesStatus) ? (
        <LoadScript googleMapsApiKey="AIzaSyD7zvy7VcdB-yOiSKCgb7l46IfKuV5BghA">
          <GoogleMap
            ref={ref}
            mapContainerStyle={containerStyle}
            center={center}
            zoom={zoom}
            options={{
              disableDefaultUI: true,
              scrollwheel: false,
              mapTypeControl: false,
              scaleControl: false,
              draggable: false,
            }}
          >
            {ends
              ? ends.map((point, index) => (
                  <Marker key={`point_${index}`} icon={Pin} position={point} />
                ))
              : null}
            {points ? (
              <Polyline
                path={points}
                options={{
                  strokeColor: "#39b0fa",
                  strokeWeight: 3,
                  icons: [
                    {
                      offset: "0",
                      repeat: "20px",
                    },
                  ],
                }}
              />
            ) : null}
          </GoogleMap>
        </LoadScript>
      ) : null}
    </div>
  );
};

const MSTP = ({
  route: { routesStatus, ends, points, bounds },
}: StateType) => ({
  routesStatus,
  ends,
  points,
  bounds,
});

const MDTP = {};

export default connect(MSTP, MDTP)(RouteMap);
