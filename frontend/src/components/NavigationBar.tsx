import { useState } from "react";
import { CgMenu } from "react-icons/cg";
import { Link } from "react-router-dom";
import styles from "./NavigationBar.module.css";
import Menu from "./Menu";

export default function NavigationBar() {
  const [hidden, setHidden] = useState(true);
  return (
    <nav className={styles.navBar}>
      <Link to={"/"}>easyCook</Link>
      <p>
        <Link to={"/register"}>Register</Link> /{" "}
        <Link to={"/login"}>Log in</Link>
      </p>
      <div className={styles.menu}>
        <CgMenu onClick={() => setHidden(!hidden)} />
        {!hidden && <Menu />}
      </div>
    </nav>
  );
}
