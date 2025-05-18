import { useState } from "react";
import { logInUser } from "../../api/authentication";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmitButton = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await logInUser(email, password);
      navigate("/");
    } catch (error) {
      console.log("error logging in: ", error);
    }
  };
  return (
    <form action="userLogin">
      <label htmlFor="email">enter your email:</label>
      <input
        type="text"
        name="email"
        id="userEmail"
        placeholder="email goes here..."
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <label htmlFor="password">enter your password:</label>
      <input
        type="text"
        name="password"
        id="userPassword"
        placeholder="password goes here..."
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <input type="submit" value="log in" onClick={handleSubmitButton} />
    </form>
  );
}
