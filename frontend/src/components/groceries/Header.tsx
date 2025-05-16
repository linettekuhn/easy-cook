import { Link } from "react-router";

function Header() {
  return (
    <>
      <Link to={"/"}>Return Home</Link>
      <h1>
        <span className="bold">what</span> you'll need
      </h1>
    </>
  );
}

export default Header;
