import { Link } from "react-router";

export default function Header() {
  return (
    <>
      <Link to={"/"}>Return Home</Link>
      <h1>
        your <span className="bold">pantry</span>
      </h1>
    </>
  );
}
