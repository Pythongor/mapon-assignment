import React from "react";
import { RouteMap } from "components";

//assets
import styles from "./routeForm.module.scss";

const VehicleForm = () => {
  return (
    <div className={styles.wrapper}>
      <RouteMap />
    </div>
  );
};

export default VehicleForm;
