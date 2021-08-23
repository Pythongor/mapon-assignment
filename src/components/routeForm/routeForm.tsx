import React, { useRef, useState } from "react";
import cn from "classnames";
import { RouteMap } from "components";

//assets
import styles from "./routeForm.module.scss";

type InputsValuesType = {
  to: string;
  from: string;
};

const VehicleForm = () => {
  const inputFromRef = useRef<HTMLInputElement>(null);
  const inputToRef = useRef<HTMLInputElement>(null);
  const now = new Date();
  const currentDate = now.toISOString().substr(0, 10);
  const [inputValues, setInputsValues] = useState<InputsValuesType>({
    from: "2018-11-09",
    to: currentDate,
  });

  const yesterday = new Date().setDate(now.getDate() - 1);
  const yesterdayDate = new Date(yesterday).toISOString().substr(0, 10);

  const changeInputHandler = (key: "to" | "from", value: string) => {
    setInputsValues((values: InputsValuesType) => ({
      ...values,
      [key]: value,
    }));
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.title}>Route report</div>
      <form className={styles.form}>
        <div className={cn(styles.formItem, styles.formItem_centered)}>
          <div className={cn(styles.label, styles.label_required)}>
            Vehicle number
          </div>
          <div className={styles.inputContainer}>
            <div className={styles.selectWrapper}>
              <select defaultValue="0" className={cn(styles.select)}>
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
            <div className={styles.dateInputContainer}>
              <div className={styles.dateLabel}>From</div>
              <input
                ref={inputFromRef}
                type="date"
                defaultValue="2018-11-09"
                className={styles.dateInput}
                max={yesterdayDate}
                onChange={(event) => {
                  changeInputHandler("from", event.currentTarget.value);
                }}
              />
            </div>
            <div className={styles.dateInputContainer}>
              <div className={styles.dateLabel}>To</div>
              <input
                ref={inputToRef}
                type="date"
                defaultValue={currentDate}
                max={currentDate}
                className={cn(styles.dateInput, {
                  [styles.dateInput_today]: inputValues.to === currentDate,
                })}
                onChange={(event) => {
                  changeInputHandler("to", event.currentTarget.value);
                }}
              />
              <div
                className={cn(styles.today, {
                  [styles.hide]: inputValues.to !== currentDate,
                })}
                onClick={() => {
                  if (inputToRef.current) {
                    inputToRef.current.focus();
                  }
                }}
              >
                Today
              </div>
            </div>
          </div>
        </div>
        <RouteMap />
        <input type="submit" value="generate" className={styles.submit} />
      </form>
    </div>
  );
};

export default VehicleForm;
