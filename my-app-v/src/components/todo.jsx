import React, { useState } from "react";
import { QueryClient, QueryClientProvider, useQuery, useMutation } from "@tanstack/react-query";

import TodoItems from "./todo_items.jsx";
import { fetchTodos, addTodo, updateTodo, deleteTodo } from "../api/api.js";

// Initialize QueryClient once outside of components
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
    mutations: {
      retry: 1,
    },
  },
});

function TodoFun() {

  const [formData, setFormData] = useState({
    displayName: "",
    key: "",
    description: "",
    attribute: "",
  });

  const [addingTodo, setAddingTodo] = useState(null);
  const [editingTodo, setEditingTodo] = useState(null);


  // Fetch todos
  const { data: todos = [], isLoading, error } = useQuery({
    queryKey: ["todos"],
    queryFn: fetchTodos,
  });

  // Add todo mutation
  const addTodoMutation = useMutation({
    mutationFn: addTodo,
    onSuccess: () => {
      queryClient.invalidateQueries(["todos"]);
    },
  });

  // Update todo mutation
  const updateTodoMutation = useMutation({
    mutationFn: updateTodo,
    onSuccess: () => {
      queryClient.invalidateQueries(["todos"]);
    },
  });


  const deleteTodoMutation = useMutation({
    mutationFn: deleteTodo,
    onSuccess: () => {
      queryClient.invalidateQueries(["todos"]);
    },
    onError: (error) => {
      console.log("Error deleting todo:", error.message);
    },
  });

  const handleDelete = (todo_id) => {
    if (window.confirm(`Are you sure you want to delete this todo? ${todo_id}`)) {
      deleteTodoMutation.mutate({ id: `${todo_id}` });
    }
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.displayName.trim() && formData.key.trim()) {
      addTodoMutation.mutate({
        key: `${formData.key}`,
        displayName: `${formData.displayName}`,
        description: `${formData.description}`,
        attribute: `${formData.attribute}`,
        completed: false,
      });
      // ****
      setFormData({
        key: "",
        displayName: "",
        description: "",
        attribute: "",
      });
    }
  };


  // Handle update
  const handleUpdate = (e) => {
    e.preventDefault();
    console.log("App:", editingTodo);
    if (editingTodo) {
      updateTodoMutation.mutate({
        ...editingTodo,
        key: formData.key || editingTodo.key,
        displayName: formData.displayName || editingTodo.displayName,
        description: formData.description || editingTodo.description,
        attribute: formData.attribute || editingTodo.attribute,
      });

      cancelEditState();
    }
  };

  // Load a todo into the form for editing call by todo_item jsx
  const handleEdit = (todo) => {
    const submitUpdateButton = document.getElementById("submit-update-btn");
    if (submitUpdateButton) {
      submitUpdateButton.innerText = "Update";
    }
    setEditingTodo(todo);
    setFormData({
      key: todo.key,
      displayName: todo.displayName,
      description: todo.description,
      attribute: todo.attribute,
    });
  };

  const handleSubmitUpdateClick = (e) => {
    if (editingTodo) {
      handleUpdate(e);
    } else {
      handleSubmit(e);
    }
  };

  const handleCancelClick = (e) => {
    if (editingTodo) {
      cancelEditState();
    }
  };

  const cancelEditState = () => {
    if (editingTodo) {
      setEditingTodo(null); // Reset editing state
      const submitUpdateButton = document.getElementById("submit-update-btn");
      if (submitUpdateButton) {
        submitUpdateButton.innerText = "Submit";
      }
      setFormData({
        key: "",
        displayName: "",
        description: "",
        attribute: "",
      });
    }
  }

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error fetching data</div>;

  return (
    <>
      {/* Todo form */}
      <div className="form-container">
        <form>
          <div className="form-input-row">
            <div className="mb-3">
              <label htmlFor="displayName" className="form-label">
                Display Name
              </label>
              <input
                type="text"
                className="form-control"
                id="displayName"
                placeholder="Enter display name"
                value={formData.displayName}
                onChange={handleChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="key" className="form-label">
                Key
              </label>
              <input
                type="text"
                className="form-control"
                id="key"
                placeholder="Enter key"
                value={formData.key}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="form-input-row">
            <div className="mb-3">
              <label htmlFor="description" className="form-label">
                Description
              </label>
              <textarea
                className="form-control"
                id="description"
                rows="2"
                placeholder="Enter description"
                value={formData.description}
                onChange={handleChange}
              ></textarea>
            </div>
            <div className="mb-3">
              <label htmlFor="attribute" className="form-label">
                Attribute
              </label>
              <textarea
                className="form-control"
                id="attribute"
                rows="2"
                placeholder="Enter attributes"
                value={formData.attribute}
                onChange={handleChange}
              ></textarea>
            </div>
          </div>

          <div className="btn-group">
            <button
              id="submit-update-btn"
              onClick={handleSubmitUpdateClick}
              type="button"
              className="btn btn-primary me-2"
            >
              Submit
            </button>
            <button
              id="cancel-btn"
              onClick={handleCancelClick}
              type="button"
              className="btn btn-secondry me-2"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>


      {/* To show all todos */}
      <TodoItems handleEditInApp={handleEdit} handleDeleteInApp={handleDelete}></TodoItems>
    </>
  );
}

// Root Component to wrap App with QueryClientProvider
function Todo() {
  return (
    <QueryClientProvider client={queryClient}>
      <TodoFun />
    </QueryClientProvider>
  );
}

export default Todo;
