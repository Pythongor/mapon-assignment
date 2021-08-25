import React from "react";
import { connect } from "react-redux";
import cn from "classnames";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

// types
import { StateType } from "store/rootReducer";

// assets
import Pin from "assets/images/pin.svg";
import styles from "./routeMap.module.scss";

const containerStyle = {
  width: "100%",
  height: "100%",
};

const center = {
  lat: 56.947034,
  lng: 24.10653,
};

type StateProps = ReturnType<typeof MSTP>;
type DispatchProps = typeof MDTP;
type RouteMapType = StateProps & DispatchProps;

const RouteMap: React.FC<RouteMapType> = ({ routesStatus, ends }) => {
  return (
    <div
      className={cn(styles.wrapper, {
        [styles.wrapper_show]: ["ok", "pending"].includes(routesStatus),
      })}
    >
      <LoadScript googleMapsApiKey="AIzaSyD7zvy7VcdB-yOiSKCgb7l46IfKuV5BghA">
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={10}
          options={{
            disableDefaultUI: true,
            scrollwheel: false,
            navigationControl: false,
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
        </GoogleMap>
      </LoadScript>
    </div>
  );
};

const MSTP = ({ route: { routesStatus, ends } }: StateType) => ({
  routesStatus,
  ends,
});

const MDTP = {};

export default connect(MSTP, MDTP)(RouteMap);
