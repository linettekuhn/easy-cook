import { Link } from "react-router-dom";
import "./global.css";
import NavigationBar from "./components/NavigationBar";

function App() {
  return (
    <>
      <NavigationBar theme="yellow" />
      <main data-theme="yellow" id="homePage">
        <h1>
          <strong className="bold">simplify</strong> your cooking.
        </h1>
        <Link className="homeButton" to={"/recipes"}>
          Recipes
        </Link>
        <Link className="homeButton" to={"/plan"}>
          Meal Plan
        </Link>
        <Link className="homeButton" to={"/groceries"}>
          Groceries
        </Link>
        <Link className="homeButton" to={"/pantry"}>
          Pantry
        </Link>
      </main>
    </>
  );
}

export default App;
