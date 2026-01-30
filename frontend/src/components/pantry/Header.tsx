import { useNavigate } from "react-router-dom";
import BackButton from "../buttons/BackButton";

export default function Header() {
  const navigate = useNavigate();
  const handleBack = () => {
    window.location.href = "#/";
  };
  return (
    <>
      <BackButton onClick={handleBack} text="BACK TO HOME" />
      <h1 className="header">
        <span className="bold">organize</span> your pantry
      </h1>
    </>
  );
}
