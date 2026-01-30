import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { HashRouter, Routes, Route } from "react-router-dom";
import App from "./App.tsx";
import Recipes from "./pages/Recipes.tsx";
import MealPrep from "./pages/MealPrep.tsx";
import FullRecipe from "./pages/FullRecipe.tsx";
import Groceries from "./pages/Groceries.tsx";
import Pantry from "./pages/Pantry.tsx";
import "./global.css";
import NavigationBar from "./components/NavigationBar.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <HashRouter>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <NavigationBar theme="yellow" />
              <App />
            </>
          }
        />
        <Route
          path="/recipes"
          element={
            <>
              <NavigationBar theme="blue" />
              <Recipes />
            </>
          }
        />
        <Route
          path="/plan"
          element={
            <>
              <NavigationBar theme="green" />
              <MealPrep />
            </>
          }
        />
        <Route
          path="/recipe"
          element={
            <>
              <NavigationBar theme="blue" />
              <FullRecipe />
            </>
          }
        />
        <Route
          path="/recipe/:id"
          element={
            <>
              <NavigationBar theme="blue" />
              <FullRecipe />
            </>
          }
        />
        <Route
          path="/groceries"
          element={
            <>
              <NavigationBar theme="red" />
              <Groceries />
            </>
          }
        />
        <Route
          path="/pantry"
          element={
            <>
              <NavigationBar theme="yellow" />
              <Pantry />
            </>
          }
        />
      </Routes>
    </HashRouter>
  </StrictMode>
);
