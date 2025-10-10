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

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <HashRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/recipes" element={<Recipes />} />
        <Route path="/plan" element={<MealPrep />} />
        <Route path="/recipe" element={<FullRecipe />} />
        <Route path="/recipe/:id" element={<FullRecipe />} />
        <Route path="/groceries" element={<Groceries />} />
        <Route path="/pantry" element={<Pantry />} />
      </Routes>
    </HashRouter>
  </StrictMode>
);
