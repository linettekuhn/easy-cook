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
import AlertMessage from "./AlertMessage";
import { FirebaseError } from "firebase/app";
import { createPortal } from "react-dom";
import ProfileIcon from "./buttons/ProfileIcon";

const firebaseErrorMap: Record<string, string> = {
  "auth/invalid-email": "Please enter a valid email address.",
  "auth/invalid-credential": "Invalid email or password.",
  "auth/user-not-found": "No account found with that email.",
  "auth/wrong-password": "Incorrect password.",
  "auth/email-already-in-use": "That email is already registered.",
  "auth/weak-password": "Password must be at least 6 characters long.",
  "auth/missing-password": "Please enter a password.",
  "auth/too-many-requests": "Too many attempts. Try again later.",
};

export default function UserAuth() {
  const [modalOpen, setModalOpen] = useState(false);

  const toggleModal = () => {
    const isOpen = !modalOpen;
    setModalOpen(isOpen);
  };

  const [alertMessage, setAlertMessage] = useState<string | null>(null);
  const [alertType, setAlertType] = useState<"error" | "warning" | "success">(
    "error"
  );
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(isUserLoggedIn());
  const navigate = useNavigate();

  useEffect(() => {
    setIsLoggedIn(isUserLoggedIn());
  }, []);

  const handleLogInButton = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setAlertMessage("Please fill email and password fields");
      setAlertType("warning");
      return;
    }
    try {
      await logInUser(email, password);
      setIsLoggedIn(true);
      setAlertMessage("User logged in!");
      setAlertType("success");
      navigate("/");
    } catch (error: unknown) {
      const err = error as FirebaseError;
      const message =
        firebaseErrorMap[err.code] || "An error occurred while logging in.";
      setAlertMessage(message);
      setAlertType("warning");
    }
  };
  const handleRegisterButton = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setAlertMessage("Please fill email and password fields");
      setAlertType("warning");
      return;
    }
    try {
      await registerUser(email, password);
      setAlertMessage("User registered!");
      setAlertType("success");
      navigate("/");
    } catch (error: unknown) {
      const err = error as FirebaseError;
      const message =
        firebaseErrorMap[err.code] || "An error occurred during registration.";
      setAlertMessage(message);
      setAlertType("warning");
    }
  };
  const handleLogOutButton = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await logOutUser();
      setIsLoggedIn(false);
      setAlertMessage("User logged out!");
      setAlertType("success");
      navigate("/");
    } catch (error: unknown) {
      const err = error as FirebaseError;
      const message =
        firebaseErrorMap[err.code] || "An error occurred while logging out.";
      setAlertMessage(message);
      setAlertType("warning");
    }
  };
  return (
    <>
      <button className={styles.profileButton} onClick={toggleModal}>
        <ProfileIcon isOpen={modalOpen} />
      </button>
      {createPortal(
        isLoggedIn ? (
          <div
            className={`${styles.userLogin} ${modalOpen ? styles.open : ""}`}
          >
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
          <form
            className={`${styles.userLogin} ${modalOpen ? styles.open : ""}`}
            action="userLogin"
          >
            <p>email:</p>
            <input
              type="text"
              name="email"
              id="userEmail"
              placeholder="email goes here..."
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setAlertMessage(null);
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                }
              }}
            />
            <p>password:</p>
            <input
              type="password"
              name="password"
              id="userPassword"
              placeholder="password goes here..."
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setAlertMessage(null);
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                }
              }}
            />
            {alertMessage && (
              <AlertMessage
                message={alertMessage}
                type={alertType}
                onClose={() => setAlertMessage(null)}
              />
            )}
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
        ),
        document.body
      )}
    </>
  );
}
