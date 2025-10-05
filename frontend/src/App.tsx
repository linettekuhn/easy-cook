import "./global.css";
import NavigationBar from "./components/NavigationBar";
import HomeCard from "./components/buttons/HomeCard";
import styles from "./App.module.css";

function App() {
  return (
    <>
      <NavigationBar theme="yellow" />
      <main data-theme="yellow" id="homePage">
        <h1>
          <strong className="bold">simplify</strong> your cooking.
        </h1>
        <div className={styles.links}>
          <HomeCard
            title="Recipes"
            link="/recipes"
            filename="recipes.png"
            theme="blue"
            message="Discover your next favorite dish"
          />
          <HomeCard
            title="Meal Plan"
            link="/plan"
            filename="prep.png"
            theme="green"
            message="Stay organized and eat better all week"
          />
          <HomeCard
            title="Pantry"
            link="/pantry"
            filename="pantry.png"
            theme="yellow"
            message="Keep track of what’s in your kitchen"
          />
          <HomeCard
            title="Groceries"
            link="/groceries"
            filename="groceries.png"
            theme="red"
            message="Turn your list into a shopping trip"
          />
        </div>
      </main>
    </>
  );
}

export default App;
