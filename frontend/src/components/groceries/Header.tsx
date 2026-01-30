import BackButton from "../buttons/BackButton";

function Header() {
  const handleBack = () => {
    window.location.href = "#/";
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
