import React from "react";
import { Link } from "react-router-dom";
import styles from "./Navbar.module.css";

const Navbar = () => {
  return (
    <div className={styles.nav}>
      {" "}
      <Link to="/">Home</Link>
      <Link to="/create-action">Create Action</Link>
      <Link to="/view-actions">View Action</Link>
      <Link to="/trip-plotting">View Trip route</Link>
    </div>
  );
};

export default Navbar;
