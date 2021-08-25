import React, { useEffect } from "react";
import { connect } from "react-redux";

// services
import ApiService from "services/apiService";

// types
import { StateType } from "store/rootReducer";

// assets
import styles from "./routeMap.module.scss";

type StateProps = ReturnType<typeof MSTP>;

type RouteMapType = StateProps;

const RouteMap: React.FC<RouteMapType> = ({ selectedUnitId, from, to }) => {
  useEffect(() => {
    // if (status === "none") {
    const service = new ApiService();
    // setStatus("pending");
    if (selectedUnitId && from && to)
      service.getRoutes(selectedUnitId, from, to).then(
        (result) => {
          console.log(result);
          // setStatus("ok");
          // setVehicles(units);
        },
        (reason) => {
          // setStatus("error");
          alert(`error: ${reason}`);
        }
      );
    // }
  });
  return <div className={styles.wrapper}></div>;
};

const MSTP = ({ route: { selectedUnitId, from, to } }: StateType) => ({
  selectedUnitId,
  from,
  to,
});

export default connect(MSTP)(RouteMap);
