import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  isUserLoggedIn,
  logInUser,
  logOutUser,
  registerUser,
} from "../api/authentication";
import { CgSmileMouthOpen } from "react-icons/cg";
import styles from "./UserAuth.module.css";

export default function UserAuth() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(isUserLoggedIn());
  const navigate = useNavigate();

  useEffect(() => {
    setIsLoggedIn(isUserLoggedIn());
  }, []);

  const handleLogInButton = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await logInUser(email, password);
      setIsLoggedIn(true);
      navigate("/");
    } catch (error) {
      console.log("error logging in: ", error);
    }
  };
  const handleRegisterButton = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await registerUser(email, password);
      navigate("/");
    } catch (error) {
      console.log("error registering account: ", error);
    }
  };
  const handleLogOutButton = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await logOutUser();
      setIsLoggedIn(false);
      navigate("/");
    } catch (error) {
      console.log("error logging in: ", error);
    }
  };
  return isLoggedIn ? (
    <div className={styles.userLogin}>
      <CgSmileMouthOpen />
      <p>you're logged in!</p>
      <button
        className="button"
        type="submit"
        value="register"
        onClick={handleLogOutButton}
      >
        log out
      </button>
    </div>
  ) : (
    <form className={styles.userLogin} action="userLogin">
      <p>email:</p>
      <input
        type="text"
        name="email"
        id="userEmail"
        placeholder="email goes here..."
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <p>password:</p>
      <input
        type="password"
        name="password"
        id="userPassword"
        placeholder="password goes here..."
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <div className={styles.buttons}>
        <button
          className="button"
          type="submit"
          value="register"
          onClick={handleRegisterButton}
        >
          register
        </button>
        <button
          className="button"
          type="submit"
          value="log in"
          onClick={handleLogInButton}
        >
          log in
        </button>
      </div>
    </form>
  );
}
