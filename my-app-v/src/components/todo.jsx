import React, { useState } from "react";
import TodoForm from "./TodoForm.jsx";
import TodoItems from "./TodoItems.jsx"
import TodoItemView from "./TodoItemView.jsx";

import useTodoLogic from "../logic/customHookFunctions/useTodoLogic.jsx";


function Todo() {

  const {
    formData,
    buttonLabel,
    todos,
    isLoading,
    error,
    handleChange,
    handleSubmit,
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

export default Todo;
