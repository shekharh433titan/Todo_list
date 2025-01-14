import React, { useState } from "react";
import { QueryClientProvider } from "@tanstack/react-query";
import MyQueryClient from "./logic/MyQueryClient"
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import Todo from "./components/todo";

import { TodoProvider } from "./logic/useTodoLogic";

// Root Component to wrap App with QueryClientProvider
// It acts as a context provider, making the QueryClient instance available to 
// all components within its child hierarchy.

function App() {
  const queryClient = MyQueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <TodoProvider> <Todo></Todo></TodoProvider>
    </QueryClientProvider>
  );
}



export default App;
