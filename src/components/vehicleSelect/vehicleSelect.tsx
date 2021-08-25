import React, { useEffect } from "react";
import cn from "classnames";
import { connect } from "react-redux";

// types
import { StateType } from "store/rootReducer";
import { UnitType } from "ducks/route/types";

// services
import ApiService from "services/apiService";

// actions
import { setVehiclesStatus, setVehicles } from "ducks/route/actions";

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
  vehiclesStatus,
  units,
  setVehiclesStatus,
  setVehicles,
}) => {
  useEffect(() => {
    if (vehiclesStatus === "none") {
      const service = new ApiService();
      setVehiclesStatus("pending");
      service.getCars().then(
        ({ units }) => {
          const preparedUnits: UnitType[] = units.map(
            ({ unit_id, number }) => ({
              unit_id,
              number,
            })
          );
          console.log(preparedUnits, vehiclesStatus);
          setVehicles(preparedUnits);
          setVehiclesStatus("ok");
        },
        (reason) => {
          setVehiclesStatus("error");
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

const MSTP = ({ route: { vehiclesStatus, units } }: StateType) => ({
  vehiclesStatus,
  units,
});

const MDTP = { setVehiclesStatus, setVehicles };

export default connect(MSTP, MDTP)(VehicleSelect);
