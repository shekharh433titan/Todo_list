import React, { useState } from "react";
import { QueryClient, QueryClientProvider, useQuery, useMutation } from "@tanstack/react-query";

import TodoForm from "./TodoForm.jsx";
import TodoItems from "./TodoItems.jsx"
import TodoItemView from "./TodoItemView.jsx";


function Todo() {
  return (
    <>
      {/* Show todo form */}
      <TodoForm></TodoForm>

      <TodoItemView></TodoItemView>
      
      {/* To show all todos */}
      {/* handleEditInApp={handleEdit} handleDeleteInApp={handleDelete} */}
      <TodoItems></TodoItems>

    </>
  );
}

export default Todo;
