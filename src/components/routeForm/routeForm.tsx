import React, { useState } from "react";
import cn from "classnames";
import { RouteMap, DateInput } from "components";
import { getDatesStrings } from "utilites";

//assets
import styles from "./routeForm.module.scss";

type InputsValuesType = {
  vehicle: string;
  to: string;
  from: string;
};

type ErrorsType = {
  vehicle: boolean;
  to: boolean;
  from: boolean;
};

const VehicleForm = () => {
  const { currentDate } = getDatesStrings();
  const [errors, setErrors] = useState<ErrorsType>({
    vehicle: false,
    from: false,
    to: false,
  });
  const [inputValues, setInputsValues] = useState<InputsValuesType>({
    vehicle: "0",
    from: "2018-11-09",
    to: currentDate,
  });

  const changeInputHandler = (
    key: "to" | "from" | "vehicle",
    value: string
  ) => {
    setInputsValues((values: InputsValuesType) => ({
      ...values,
      [key]: value,
    }));
  };

  const changeErrorHandler = (
    key: "to" | "from" | "vehicle",
    value: boolean
  ) => {
    setErrors((errors: ErrorsType) => ({
      ...errors,
      [key]: value,
    }));
  };

  const validate = () => {
    const { to, from, vehicle } = inputValues;
    const fromDate = new Date(from);
    const toDate = new Date(to);
    if (fromDate >= toDate) {
      changeErrorHandler("to", true);
      changeErrorHandler("from", true);
    } else {
      changeErrorHandler("to", false);
      changeErrorHandler("from", false);
    }
    if (vehicle === "0") {
      changeErrorHandler("vehicle", true);
    } else changeErrorHandler("vehicle", false);
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.title}>Route report</div>
      <div className={cn(styles.formItem, styles.formItem_centered)}>
        <div className={cn(styles.label, styles.label_required)}>
          Vehicle number
        </div>
        <div className={styles.inputContainer}>
          <div className={styles.selectWrapper}>
            <select
              defaultValue={inputValues.vehicle}
              className={cn(styles.select, {
                [styles.select_error]: errors.vehicle,
              })}
              onChange={(event) => {
                changeInputHandler("vehicle", event.currentTarget.value);
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
        </div>
      </div>
      <div className={styles.formItem}>
        <div className={styles.label}>Period</div>
        <div className={styles.inputContainer}>
          <DateInput
            value={inputValues.from}
            title="From"
            changeInputHandler={(event) => {
              changeInputHandler("from", event.currentTarget.value);
            }}
            isError={errors.from}
          />
          <DateInput
            title="To"
            withToday
            value={inputValues.to}
            changeInputHandler={(event) => {
              changeInputHandler("to", event.currentTarget.value);
            }}
            isError={errors.to}
          />
        </div>
      </div>
      <RouteMap />
      <input
        type="button"
        value="generate"
        className={styles.submit}
        onClick={validate}
      />
    </div>
  );
};

export default VehicleForm;
