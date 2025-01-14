import React from "react";
import useTodoLogic from "../logic/useTodoLogic";

function TodoItemView() {
    const {
        viewTodoItem,
        closeViewTodoComp
    } = useTodoLogic();

    return (
        <div id="todo-item-view-id" className="todo-view-card container mt-3">
            <div className="card">
                <div className="card-body">
                    <h5 className="card-title"> <strong> Name: </strong> {viewTodoItem.displayName}</h5>
                    <h6 className="card-title"> <strong> Key: </strong> {viewTodoItem.key}</h6>
                    <p className="card-text"><strong>Description:</strong> {viewTodoItem.description}</p>
                    <p className="card-text"><strong>Attribute:</strong> {viewTodoItem.attribute}</p>
                    <a onClick={() => closeViewTodoComp()} className="btn btn-outline-danger">X</a>
                </div>
            </div>
        </div>
    );
};

export default TodoItemView;