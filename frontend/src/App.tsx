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
          <Link to={"/recipes"}>Recipes</Link>
          <Link to={"/plan"}>Meal Plan</Link>
        </ul>
      </main>
    </>
  );
}

export default App;
