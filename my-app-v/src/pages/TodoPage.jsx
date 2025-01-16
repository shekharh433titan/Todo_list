import React, { useState } from "react";
import TodoForm from "../components/TodoForm.jsx";
import TodoItems from "../components/TodoItems.jsx";
import TodoItemView from "../components/TodoItemView.jsx";
import useTodoLogic from "../hooks/useTodoLogic.jsx";


function TodoPage() {

  const {
    formData,
    buttonLabel,
    todos,
    isLoading,
    error,
    handleChange,
    deleteTodoFun,
    handleSubmitUpdateClick,
    handelCancelClick,
    handleEdit,
    viewTodoItem,
    viewTodoComponent,
    closeViewTodoComponent
  } = useTodoLogic();

  return (
    <>
      {/* Show todo form */}
      <TodoForm
        formData={formData}
        handleChange={handleChange}
        handleSubmitUpdateClick={handleSubmitUpdateClick}
        handelCancelClick={handelCancelClick}
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
            deleteTodoFun={deleteTodoFun}
            handleEdit={handleEdit}
            viewTodoComponent={viewTodoComponent}
      />

    </>
  );
}

export default TodoPage;

