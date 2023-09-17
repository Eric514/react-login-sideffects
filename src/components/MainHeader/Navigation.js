import React, { useContext } from "react";

import classes from "./Navigation.module.css";
import AuthContext from "../store/auth-context";

const Navigation = (props) => {
  // utilisation de useConext pointant vers AuthContext. Je stock la valeur du context dans ctx
  const ctx = useContext(AuthContext);
  return (
    <nav className={classes.nav}>
      <ul>
        {/* {props.isLoggedIn && ( */}
        {ctx.isLoggedIn && (
          <li>
            <a href="/">Users</a>
          </li>
        )}
        {/* {props.isLoggedIn && ( */}
        {ctx.isLoggedIn && (
          <li>
            <a href="/">Admin</a>
          </li>
        )}
        {/* {props.isLoggedIn && ( */}
        {ctx.isLoggedIn && (
          <li>
            <button onClick={props.onLogout}>Logout</button>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navigation;
