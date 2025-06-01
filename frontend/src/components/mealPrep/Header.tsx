import { useNavigate } from "react-router-dom";
import BackButton from "../buttons/BackButton";

function Header() {
  const navigate = useNavigate();
  const handleBack = () => {
    navigate("/");
  };
  return (
    <>
      <BackButton onClick={handleBack} text="BACK TO HOME" />
      <h1>
        <span className="bold">plan</span> your week
      </h1>
    </>
  );
}

export default Header;
