import { useNavigate } from "react-router";
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
        your <span className="bold">pantry</span>
      </h1>
    </>
  );
}
