import * as React from "react";
import {style} from "typestyle";

const styles = {
  container: style({
    background: "#242424",
    fontWeight: 700,
    height: 60,
    padding: "0 1.25rem"
  }),
  header: style({
    margin: "0 auto",
    maxWidth: "65.125rem"
  }),
  text: style({
    color: "#fff",
    fontSize: "1.875rem",
    fontWeight: 100,
    lineHeight: "60px",
    margin: 0,
    textTransform: "uppercase",
    whiteSpace: "nowrap"
  })
};

const Header = () => (
  <nav className={styles.container}>
    <div className={styles.header}>
      <h3 className={styles.text}>
        Logs
      </h3>
    </div>
  </nav>
);

export {Header};
