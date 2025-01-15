import React, { useState } from "react";
import { QueryClientProvider } from "@tanstack/react-query";

import queryClient from "../logic/MyQueryClient"
import Todo from "../components/Todo";

function TodoPage() {
  return (
    <QueryClientProvider client={queryClient}>
        <Todo></Todo>
    </QueryClientProvider>
  );
}



export default TodoPage;
