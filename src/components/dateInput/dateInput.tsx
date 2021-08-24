import React, { useEffect, useRef, useState } from "react";
import cn from "classnames";

import { getDatesStrings } from "utilites";

//hooks
import { useClickOutside } from "hooks/useClickOutside";

//assets
import styles from "./dateInput.module.scss";

type DateInputProps = {
  withToday?: boolean;
  isError?: boolean;
  changeInputHandler?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  value: string;
  title: string;
};

const DateInput: React.FC<DateInputProps> = ({
  changeInputHandler,
  value,
  withToday = false,
  isError = false,
  title,
}) => {
  const ref = useRef<HTMLInputElement>(null);
  const [isFocused, setIsFocused] = useState<boolean>(false);

  useClickOutside(ref, () => {
    if (ref.current && document.activeElement === ref.current) {
      ref.current.blur();
    }
  });

  useEffect(() => {
    if (withToday && ref.current) {
      if (isFocused && document.activeElement !== ref.current) {
        setIsFocused(false);
      } else if (!isFocused && document.activeElement === ref.current) {
        setIsFocused(true);
      }
    }
  }, [isFocused, withToday]);

  const { currentDate, yesterdayDate } = getDatesStrings();

  return (
    <div className={styles.dateInputContainer}>
      <div className={styles.dateLabel}>{title}</div>
      <input
        ref={ref}
        type="date"
        defaultValue={value}
        max={withToday ? currentDate : yesterdayDate}
        className={cn(
          styles.dateInput,
          {
            [styles.dateInput_today]: value === currentDate && !isFocused,
          },
          { [styles.dateInput_error]: isError }
        )}
        onChange={(event) => {
          if (changeInputHandler) changeInputHandler(event);
        }}
        onBlur={() => {
          setIsFocused(false);
        }}
        onClick={() => {
          if (ref.current) {
            setIsFocused(true);
            ref.current.select();
          }
        }}
      />
      {withToday ? (
        <div
          className={cn(styles.today, {
            [styles.hide]: value !== currentDate || isFocused,
          })}
          onClick={() => {
            if (ref.current) {
              setIsFocused(true);
              ref.current.select();
            }
          }}
        >
          Today
        </div>
      ) : null}
    </div>
  );
};

export default DateInput;
