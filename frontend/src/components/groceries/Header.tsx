import { Link } from "react-router";

function Header() {
  return (
    <>
      <Link to={"/"}>Return Home</Link>
      <h1>
        <span className="bold">groceries</span> for the week
      </h1>
    </>
  );
}

export default Header;
