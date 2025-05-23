import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { isUserLoggedIn, logInUser, registerUser } from "../api/authentication";
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
  return isLoggedIn ? (
    <div className={styles.userLogin}>
      <CgSmileMouthOpen />
      <h4>you're logged in!</h4>
    </div>
  ) : (
    <form className={styles.userLogin} action="userLogin">
      <label htmlFor="email">email:</label>
      <input
        type="text"
        name="email"
        id="userEmail"
        placeholder="email goes here..."
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <label htmlFor="password">password:</label>
      <input
        type="password"
        name="password"
        id="userPassword"
        placeholder="password goes here..."
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <div className={styles.buttons}>
        <button type="submit" value="register" onClick={handleRegisterButton}>
          register
        </button>
        <button type="submit" value="log in" onClick={handleLogInButton}>
          log in
        </button>
      </div>
    </form>
  );
}
