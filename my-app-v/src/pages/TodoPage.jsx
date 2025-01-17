import React, { useState } from "react";

//Components
import TodoForm from "../components/TodoForm.jsx";
import TodoItems from "../components/TodoItems.jsx";
import TodoItemView from "../components/TodoItemView.jsx";

//Hooks
import useTodoLogic from "../hooks/useTodoLogic.jsx";
import useTodoForm from "../hooks/useTodoForm.jsx";
import useTodoItems from "../hooks/useTodoItems.jsx";


function TodoPage() {

  const {
    todos,
    isLoading,
    error,
    onSubmit,
    deleteTodoMutation
  } = useTodoLogic();

  const {
    emptyTodo,
    formData,
    buttonLabel,
    editingTodo,
    handleChange,
    handleSubmit,
    handleEdit,
    cancelEdit,
  } = useTodoForm({onSubmit, todos});

  const {
    viewTodoItem,
    closeViewTodoComponent,
    deleteTodoAction,
    viewTodoComponent
  } = useTodoItems({ handleEdit, editingTodo, deleteTodoMutation, emptyTodo });

  return (
    <>
      {/* Show todo form */}

      <TodoForm
        todos={todos}
        formData={formData}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        cancelEdit={cancelEdit}
        isLoading={isLoading}
        error={error}
        buttonLabel={buttonLabel} />

      <TodoItemView
        viewTodoItem={viewTodoItem}
        closeViewTodoComponent={closeViewTodoComponent}
      />

      {/* To show all todos */}
      <TodoItems
        todos={todos}
        deleteTodoAction={deleteTodoAction}
        handleEdit={handleEdit}
        viewTodoComponent={viewTodoComponent}
      />

    </>
  );
}

export default TodoPage;

