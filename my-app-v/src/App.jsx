import React, { useState, StrictMode } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { QueryClientProvider } from "@tanstack/react-query";
import queryClient from "./utils/queryClient";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "./App.css";

import TodoPage from "./pages/TodoPage";
import TestPage from "./pages/TestPage";
import NotFoundPage from "./pages/NotFoundPage";

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
      <QueryClientProvider client={queryClient}>
        <RouterProvider
          router={router}
          future={{
            v7_startTransition: true,
          }} />
      </QueryClientProvider>
    </StrictMode>
  );
}

export default App;
