import React from "react";
import { FaEye, FaEdit, FaTrash } from "react-icons/fa"; // Icons for actions

function TodoItems(
  { 
    todos, 
    deleteTodoAction, 
    handleEdit, 
    viewTodoComponent 
  }) {
  return (
    <div className="container mt-4">
      <div className="card shadow-sm p-3">
        <h4 className="text-center mb-3">Todo List</h4>
        <div className="table-responsive">
          <table className="table table-striped table-hover table-bordered mb-5">
            <thead className="table-dark">
              <tr>
                <th scope="col">ID</th>
                <th scope="col">Key</th>
                <th scope="col">Name</th>
                <th scope="col" className="text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {todos.map((todo) => (
                <tr key={todo.id}>
                  <th scope="row">{todo.id}</th>
                  <td>{todo.key}</td>
                  <td>{todo.displayName}</td>
                  <td className="text-center">
                    <div className="dropdown">
                      <button
                        className="btn btn-primary dropdown-toggle"
                        type="button"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                        style={{ zIndex: 1050 }} // Ensure dropdown is on top
                      >
                        Actions
                      </button>
                      <ul className="dropdown-menu">
                        <li>
                          <button
                            className="dropdown-item d-flex align-items-center"
                            onClick={() => viewTodoComponent(todo)}
                          >
                            <FaEye className="me-2 text-primary" /> View
                          </button>
                        </li>
                        <li>
                          <button
                            className="dropdown-item d-flex align-items-center"
                            onClick={() => handleEdit(todo)}
                          >
                            <FaEdit className="me-2 text-warning" /> Update
                          </button>
                        </li>
                        <li>
                          <button
                            className="dropdown-item d-flex align-items-center text-danger"
                            onClick={() => deleteTodoAction(todo)}
                          >
                            <FaTrash className="me-2" /> Delete
                          </button>
                        </li>
                      </ul>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default TodoItems;
