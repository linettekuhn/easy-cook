import { useState } from "react";
import { CgMenu, CgProfile } from "react-icons/cg";
import { Link } from "react-router-dom";
import styles from "./NavigationBar.module.css";
import Menu from "./Menu";
import UserAuth from "./UserAuth";

export default function NavigationBar() {
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);

  const closeAll = () => {
    setMenuOpen(false);
    setIsLoginOpen(false);
  };
  const showBackdrop = isMenuOpen || isLoginOpen;
  return (
    <>
      {showBackdrop && (
        <div className={styles.backdrop} onClick={closeAll}></div>
      )}
      <nav className={styles.navBar}>
        <Link to={"/"}>easyCook</Link>
        <div className={styles.buttons}>
          <div className={styles.modal}>
            <CgProfile onClick={() => setIsLoginOpen(!isLoginOpen)} />
            {isLoginOpen && <UserAuth />}
          </div>
          <div className={styles.menu}>
            <CgMenu onClick={() => setMenuOpen(!isMenuOpen)} />
            {isMenuOpen && <Menu />}
          </div>
        </div>
      </nav>
    </>
  );
}
