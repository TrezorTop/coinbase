import React, { FC } from "react";
import classes from "./Layout.module.scss";

const Layout: FC = ({ children }) => {
  return (
    <div className={classes.Layout}>
      <header className={classes.Header}>API: coingecko.com</header>
      <main className={classes.Main}>{children}</main>
    </div>
  );
};

export default Layout;
