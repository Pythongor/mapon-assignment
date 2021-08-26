import React from "react";
import cn from "classnames";
import { connect } from "react-redux";
import { getHoursAndMinutes } from "utilites";

// types
import { StateType } from "store/rootReducer";

// assets
import styles from "./routeInfo.module.scss";

type StateProps = ReturnType<typeof MSTP>;
type RouteInfoProps = StateProps;

const RouteInfo: React.FC<RouteInfoProps> = ({
  routesStatus,
  kilometers,
  drivingTime,
}) => {
  const { hours, minutes } = getHoursAndMinutes(drivingTime);
  const averageSpeed = kilometers / (drivingTime / 3_600_000);
  return (
    <div
      className={cn(styles.wrapper, {
        [styles.wrapper_show]: ["ok", "pending"].includes(routesStatus),
      })}
    >
      <div className={styles.cell}>
        <div className={styles.value}>{Math.round(kilometers)}</div>
        <div className={styles.description}>Km driven</div>
      </div>
      <div className={cn(styles.cell, styles.cell_center)}>
        <div className={styles.value}>{`${hours}h ${minutes}m`}</div>
        <div className={styles.description}>Driving time</div>
      </div>
      <div className={styles.cell}>
        <div className={styles.value}>{`${Math.round(averageSpeed)} km/h`}</div>
        <div className={styles.description}>Average speed</div>
      </div>
    </div>
  );
};

const MSTP = ({
  route: { routesStatus, kilometers, drivingTime },
}: StateType) => ({
  routesStatus,
  kilometers,
  drivingTime,
});

export default connect(MSTP)(RouteInfo);
