import React, { useEffect } from "react";
import { connect } from "react-redux";
import cn from "classnames";
import { GoogleMap, LoadScript } from "@react-google-maps/api";

// actions
import { setRoutesStatus } from "ducks/route/actions";

// services
import ApiService from "services/apiService";

// types
import { StateType } from "store/rootReducer";

// assets
import styles from "./routeMap.module.scss";

const containerStyle = {
  width: "100%",
  height: "100%",
};

const center = {
  lat: 56.48133,
  lng: 23.06746,
};

type StateProps = ReturnType<typeof MSTP>;
type DispatchProps = typeof MDTP;
type RouteMapType = StateProps & DispatchProps;

const RouteMap: React.FC<RouteMapType> = ({
  selectedUnitId,
  from,
  to,
  routesStatus,
  setRoutesStatus,
}) => {
  useEffect(() => {
    if (routesStatus === "none" && selectedUnitId && from && to) {
      const service = new ApiService();
      setRoutesStatus("pending");
      if (selectedUnitId && from && to)
        service.getRoutes(selectedUnitId, from, to).then(
          (result) => {
            console.log(result);
            setRoutesStatus("ok");
          },
          (reason) => {
            setRoutesStatus("error");
            alert(`error: ${reason}`);
          }
        );
    }
  });

  return (
    <div
      className={cn(styles.wrapper, {
        // TODO set to routesStatus
        [styles.wrapper_show]: selectedUnitId && from && to,
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
          {/* Child components, such as markers, info windows, etc. */}
          <></>
        </GoogleMap>
      </LoadScript>
    </div>
  );
};

const MSTP = ({
  route: { selectedUnitId, from, to, routesStatus },
}: StateType) => ({
  selectedUnitId,
  from,
  to,
  routesStatus,
});

const MDTP = { setRoutesStatus };

export default connect(MSTP, MDTP)(RouteMap);
