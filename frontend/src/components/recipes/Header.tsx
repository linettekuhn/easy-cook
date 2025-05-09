import { Link } from "react-router";

export default function Header() {
  return (
    <>
      <Link to={"/"}>Return Home</Link>
      <h1>
        <span className="bold">find</span> recipes
      </h1>
    </>
  );
}
