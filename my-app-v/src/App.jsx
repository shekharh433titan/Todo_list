import React, { useState, StrictMode } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom"

import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

import TodoPage from "./pages/TodoPage"
import TestPage from "./pages/TestPage"

const router = createBrowserRouter([
  {
    path: "/",
    element: <TodoPage />
  },
  {
    path: "/testpage",
    element: <TestPage />
  }
]);

function App() {
  return (
    <StrictMode>
      <RouterProvider
        router={router}
        future={{
          v7_startTransition: true,
        }} />
    </StrictMode>
  );
}

export default App;
