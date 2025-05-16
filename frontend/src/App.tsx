import { Link } from "react-router-dom";
import "./App.css";

function App() {
  return (
    <>
      <main>
        <p>
          <strong>simplify</strong> your cooking.
        </p>
        <ul className="pages">
          <li>
            {" "}
            <Link to={"/recipes"}>Recipes</Link>
          </li>
          <li>
            <Link to={"/plan"}>Meal Plan</Link>
          </li>
          <li>
            <Link to={"/groceries"}>Groceries</Link>
          </li>
          <li>
            <Link to={"/pantry"}>Pantry</Link>
          </li>
        </ul>
      </main>
    </>
  );
}

export default App;
