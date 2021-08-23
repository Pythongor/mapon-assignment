import React from "react";
import { Logo, RouteForm } from "components";

//assets
import styles from "./app.module.scss";

const App = () => {
  return (
    <div className={styles.wrapper}>
      <Logo />
      <RouteForm />
    </div>
  );
};

export default App;
