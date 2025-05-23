import { Link } from "react-router-dom";
import "./global.css";
import NavigationBar from "./components/NavigationBar";

function App() {
  return (
    <>
      <NavigationBar />
      <main>
        <p>
          <strong>simplify</strong> your cooking.
        </p>
        <ul className="pages">
          <li>
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
