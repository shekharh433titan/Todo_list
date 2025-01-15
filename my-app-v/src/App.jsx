import React, { useState, StrictMode } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom"

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "./App.css";

import TodoPage from "./pages/TodoPage"
import TestPage from "./pages/TestPage"
import NotFoundPage from "./pages/NotFoundPage"

const router = createBrowserRouter([
  {
    path: "/",
    element: <TodoPage />,
    errorElement: <NotFoundPage />
  },
  {
    path: "/testpage",
    element: <TestPage />,
    errorElement: <NotFoundPage />
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
