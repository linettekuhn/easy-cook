import { useNavigate } from "react-router";
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
        <span className="bold">what</span> you'll need
      </h1>
    </>
  );
}

export default Header;
