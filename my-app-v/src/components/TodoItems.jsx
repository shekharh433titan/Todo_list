import React from "react";

function TodoItems({
  todos,
  deleteTodoAction,
  handleEdit,
  viewTodoComponent }) {

  return (
    <>
      <div className="container mt-3">
        <table className="table todo-lists-table">
          <thead>
            <tr>
              <th scope="col">ID</th>
              <th scope="col">KEY</th>
              <th scope="col">NAME</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            {todos.map((todo) => (
              <tr key={todo.id}>
                <th scope="row">{todo.id}</th>
                <td>{todo.key}</td>
                <td>{todo.displayName}</td>
                <td>
                  <div className="col dropdown">
                    <button
                      className="btn btn-secondary dropdown-toggle"
                      type="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      Actions
                    </button>
                    <ul className="dropdown-menu">
                      <li>
                        <button
                          className="dropdown-item"
                          onClick={() => viewTodoComponent(todo)}
                        >
                          View
                        </button>
                      </li>
                      <li>
                        <button
                          className="dropdown-item text-danger"
                          onClick={() => deleteTodoAction(todo)}
                        >
                          Delete
                        </button>
                      </li>
                      <li>
                        <button
                          className="dropdown-item"
                          onClick={() => handleEdit(todo)}
                        >
                          Update
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
    </>
  );
}

export default TodoItems;
