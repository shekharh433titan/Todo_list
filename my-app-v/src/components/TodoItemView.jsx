import React from "react";
import { FaTimes } from "react-icons/fa"; // Import close icon

function TodoItemView({ viewTodoItem, closeViewTodoComponent, viewTodoItemContainer }) {
    if (!viewTodoItemContainer) {
        return null;
    }

    return (
        <div className="container mt-4">
            <div id="todo-item-view-id" className="d-flex justify-content-center mt-4">
                <div className="card shadow-lg p-3 rounded" style={{width: "100%" }}>
                    {/* Card Header with Close Button */}
                    <div className="card-header d-flex justify-content-between align-items-center bg-primary text-white">
                        <h5 className="mb-0">Todo Details</h5>
                        <button
                            className="btn btn-light btn-sm"
                            onClick={closeViewTodoComponent}
                            style={{ borderRadius: "50%" }}
                        >
                            <FaTimes className="text-danger" />
                        </button>
                    </div>

                    {/* Card Body with Details */}
                    <div className="card-body">
                        <h6 className="card-title"><strong>Name:</strong> {viewTodoItem.displayName}</h6>
                        <h6 className="card-title"><strong>Key:</strong> {viewTodoItem.key}</h6>
                        <p className="card-text"><strong>Description:</strong> {viewTodoItem.description}</p>
                        <p className="card-text"><strong>Attribute:</strong> {viewTodoItem.attribute}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default TodoItemView;
