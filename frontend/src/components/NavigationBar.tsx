import { useState } from "react";
import styles from "./NavigationBar.module.css";
import "../global.css";
import Menu from "./Menu";
import UserAuth from "./UserAuth";
import HomeButton from "./HomeButton";

type NavigationBarProps = {
  theme: string;
};
export default function NavigationBar({ theme }: NavigationBarProps) {
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
      <nav data-theme={theme}>
        <div title="Click to see profile">
          <UserAuth />
        </div>
        <HomeButton />
        <div title="Click to see menu">
          <Menu />
        </div>
      </nav>
    </>
  );
}
