import NavigationBar from "./components/NavigationBar";
import HomeCard from "./components/buttons/HomeCard";
import styles from "./App.module.css";
import FadeInStaggerChild from "./components/animations/FadeInStaggerChild";
import FadeInStaggerParent from "./components/animations/FadeInStaggerParent";

function App() {
  return (
    <>
      <NavigationBar theme="yellow" />
      <FadeInStaggerParent data-theme="yellow" id="homePage">
        <FadeInStaggerChild>
          <h1>
            <strong className="bold">simplify</strong> your cooking.
          </h1>
        </FadeInStaggerChild>
        <div className={styles.links}>
          <FadeInStaggerChild>
            <HomeCard
              title="Recipes"
              link="/recipes"
              filename="recipes.png"
              theme="blue"
              message="Discover your next favorite dish"
            />
          </FadeInStaggerChild>
          <FadeInStaggerChild>
            <HomeCard
              title="Meal Plan"
              link="/plan"
              filename="prep.png"
              theme="green"
              message="Stay organized and eat better all week"
            />
          </FadeInStaggerChild>
          <FadeInStaggerChild>
            <HomeCard
              title="Pantry"
              link="/pantry"
              filename="pantry.png"
              theme="yellow"
              message="Keep track of what’s in your kitchen"
            />
          </FadeInStaggerChild>
          <FadeInStaggerChild>
            <HomeCard
              title="Groceries"
              link="/groceries"
              filename="groceries.png"
              theme="red"
              message="Turn your list into a shopping trip"
            />
          </FadeInStaggerChild>
        </div>
      </FadeInStaggerParent>
    </>
  );
}

export default App;
