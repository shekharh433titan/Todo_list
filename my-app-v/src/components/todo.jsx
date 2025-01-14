import React, { useState } from "react";
import { QueryClient, QueryClientProvider, useQuery, useMutation } from "@tanstack/react-query";

import TodoForm from "./TodoForm.jsx";
import TodoItems from "./TodoItems.jsx"


function Todo() {
  return (
    <>
      {/* Show todo form */}
      <TodoForm></TodoForm>

      {/* To show all todos */}
      {/* handleEditInApp={handleEdit} handleDeleteInApp={handleDelete} */}
      <TodoItems></TodoItems>
    </>
  );
}

export default Todo;
