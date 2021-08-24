import React from "react";
import cn from "classnames";

//assets
import styles from "./vehicleSelect.module.scss";

type VehicleSelectProps = {
  value: string;
  isError?: boolean;
  changeInputHandler?: (event: React.ChangeEvent<HTMLSelectElement>) => void;
};

const VehicleSelect: React.FC<VehicleSelectProps> = ({
  value,
  isError = false,
  changeInputHandler,
}) => {
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
        <option value="0" disabled hidden>
          Select vehicle
        </option>
        <option value="">1</option>
        <option value="">2</option>
        <option value="">3</option>
        <option value="">4</option>
      </select>
    </div>
  );
};

export default VehicleSelect;
