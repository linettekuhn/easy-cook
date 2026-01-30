import BackButton from "../buttons/BackButton";

export default function Header() {
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
