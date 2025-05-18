import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import App from "./App.tsx";
import Recipes from "./pages/Recipes.tsx";
import MealPrep from "./pages/MealPrep.tsx";
import FullRecipe from "./pages/FullRecipe.tsx";
import Groceries from "./pages/Groceries.tsx";
import Pantry from "./pages/Pantry.tsx";
import Register from "./pages/auth/Register.tsx";
import Login from "./pages/auth/Login.tsx";

const router = createBrowserRouter([
  { path: "/", element: <App /> },
  { path: "/recipes", element: <Recipes /> },
  { path: "/plan", element: <MealPrep /> },
  { path: "/recipe/:id", element: <FullRecipe /> },
  { path: "/groceries", element: <Groceries /> },
  { path: "/pantry", element: <Pantry /> },
  { path: "/register", element: <Register /> },
  { path: "/login", element: <Login /> },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
