import React, { useEffect } from "react";
import cn from "classnames";
import { connect } from "react-redux";

// types
import { StateType } from "store/rootReducer";

// services
import ApiService from "services/apiService";

// actions
import { setStatus, setVehicles } from "ducks/route/actions";

// assets
import styles from "./vehicleSelect.module.scss";

type OwnProps = {
  value: string;
  isError?: boolean;
  changeInputHandler?: (event: React.ChangeEvent<HTMLSelectElement>) => void;
};

type StateProps = ReturnType<typeof MSTP>;
type DispatchProps = typeof MDTP;
type VehicleSelectProps = StateProps & DispatchProps & OwnProps;

const VehicleSelect: React.FC<VehicleSelectProps> = ({
  value,
  isError = false,
  changeInputHandler,
  status,
  units,
  setStatus,
  setVehicles,
}) => {
  useEffect(() => {
    if (status === "none") {
      const service = new ApiService();
      setStatus("pending");
      service.getCars().then(
        ({ units }) => {
          console.log(units);
          setStatus("ok");
          setVehicles(units);
        },
        (reason) => {
          setStatus("error");
          alert(`error: ${reason}`);
        }
      );
    }
  });

  return (
    <div className={styles.selectWrapper}>
      <select
        defaultValue={value}
        className={cn(styles.select, {
          [styles.select_error]: isError,
        })}
        onChange={(event) => {
          if (changeInputHandler) changeInputHandler(event);
        }}
      >
        <option value="" disabled hidden>
          Select vehicle
        </option>
        {units.map(({ number, unit_id }) => (
          <option key={unit_id} value={unit_id}>
            {number}
          </option>
        ))}
      </select>
    </div>
  );
};

const MSTP = ({ route: { status, units } }: StateType) => ({
  status,
  units,
});

const MDTP = { setStatus, setVehicles };

export default connect(MSTP, MDTP)(VehicleSelect);
