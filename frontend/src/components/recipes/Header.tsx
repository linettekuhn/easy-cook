import { useNavigate } from "react-router";
import "../../global.css";
import BackButton from "../buttons/BackButton";

export default function Header() {
  const navigate = useNavigate();
  const handleBack = () => {
    navigate("/");
  };
  return (
    <>
      <BackButton onClick={handleBack} text="BACK TO HOME" />
      <h1>
        <span className="bold">find</span> recipes
      </h1>
    </>
  );
}
