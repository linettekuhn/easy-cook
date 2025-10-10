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
      <h1 className="header">
        <span className="bold">shop</span> smart
      </h1>
    </>
  );
}

export default Header;
