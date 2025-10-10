import { useNavigate } from "react-router-dom";
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
      <h1 className="header">
        <span className="bold">find</span> recipes
      </h1>
    </>
  );
}
