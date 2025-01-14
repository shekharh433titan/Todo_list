import React from "react";
import useTodoLogic from "../logic/useTodoLogic";

function TodoItems() {

  const {
    todos,
    deleteTodoFun,
    handleEdit,
  } = useTodoLogic();


  const onView = (todo) => {
    console.log("Viewing:", todo);
    //toggleDetails(todo.id);
  };

  // const toggleDetails = (id) => {
  //     console.log("test incomplete");
  // }

  // if (todos.length === 0) {
  //   return (
  //     <div className="container mt-3">
  //       <div className="row align-items-center mb-3 p-2 border rounded bg-light">No todos</div>
  //     </div>
  //   )
  // }

  return (
    <>
      <div className="container mt-3">
        {/* Loop through todos and display each item */}
        {todos.map((todo) => (
          <div key={todo.id}>
            <div
              className="row align-items-center mb-3 p-2 border rounded bg-light"
            >
              <div className="col">
                <strong>Key:</strong> {todo.key}
              </div>
              <div className="col">
                <strong>Name:</strong> {todo.displayName}
              </div>
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
                      onClick={() => onView(todo)}
                    >
                      View
                    </button>
                  </li>
                  <li>
                    <button
                      className="dropdown-item text-danger"
                      onClick={() => deleteTodoFun(todo)}
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
            </div>

            {/* show todo item */}
            {/* <div id={todo.id} className="todo-details">
              < div className="todo-details row align-items-center mb-3 p-2 border rounded bg-success-subtle" >
                <div className="col-md-10">
                  <strong>Description:</strong> {todo.description}
                </div>
                <div className="col-md-10">
                  <strong>Attribute:</strong> {todo.attribute}
                </div>
                <div className="col-md-2 text-end">
                  <button
                    className="btn btn-danger btn-sm"
                    type="button"
                    onClick={() => toggleDetails(todo.id)}>✖</button>
                </div>
              </div>
            </div> */}
          </div>
        ))}
      </div >

    </>
  );
}

export default TodoItems;
