import React, { useState } from "react";
import { connect } from "react-redux";
import cn from "classnames";
import { RouteMap, DateInput, VehicleSelect } from "components";
import { getDatesStrings, getDaysDelta } from "utilites";

// actions
import { setUnitId, setFromDate, setToDate } from "ducks/route/actions";

// assets
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

type DispatchProps = typeof MDTP;
type VehicleFormProps = DispatchProps;

const VehicleForm: React.FC<VehicleFormProps> = ({
  setUnitId,
  setFromDate,
  setToDate,
}) => {
  const { currentDate, yesterdayDate } = getDatesStrings();
  const [errors, setErrors] = useState<ErrorsType>({
    vehicle: false,
    from: false,
    to: false,
  });
  const [inputValues, setInputsValues] = useState<InputsValuesType>({
    vehicle: "",
    from: yesterdayDate,
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
    changeErrorHandler(key, false);
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
    const moreThanMonth = getDaysDelta(from, to) > 31;
    const timeReversed = fromDate >= toDate;
    if (moreThanMonth || timeReversed) {
      changeErrorHandler("to", true);
      changeErrorHandler("from", true);
    } else {
      changeErrorHandler("to", false);
      changeErrorHandler("from", false);
    }
    if (vehicle === "") {
      changeErrorHandler("vehicle", true);
    } else changeErrorHandler("vehicle", false);

    return !moreThanMonth && !timeReversed && vehicle !== "";
  };

  const submit = () => {
    const validated = validate();
    if (validated) {
      const { to, from, vehicle } = inputValues;
      setUnitId(+vehicle);
      setFromDate(from);
      setToDate(to);
    }
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.form}>
        <div className={styles.title}>Route report</div>
        <div className={cn(styles.formItem, styles.formItem_centered)}>
          <div className={cn(styles.label, styles.label_required)}>
            Vehicle number
          </div>
          <div className={styles.inputContainer}>
            <VehicleSelect
              value={inputValues.vehicle}
              changeInputHandler={(event) => {
                changeInputHandler("vehicle", event.currentTarget.value);
              }}
              isError={errors.vehicle}
            />
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
      </div>
      <RouteMap />
      <div className={styles.submit}>
        <input
          type="button"
          value="generate"
          className={styles.button}
          onClick={submit}
        />
      </div>
    </div>
  );
};

const MDTP = { setUnitId, setFromDate, setToDate };

export default connect(null, MDTP)(VehicleForm);
