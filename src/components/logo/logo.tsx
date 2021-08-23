import React from "react";

//assets
import { ReactComponent as LogoImage } from "assets/images/logo.svg";
import styles from "./logo.module.scss";

const Logo = () => {
  return (
    <div className={styles.wrapper}>
      <LogoImage className={styles.image} />
    </div>
  );
};

export default Logo;
