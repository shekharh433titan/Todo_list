import React, { useCallback, useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import Swal from 'sweetalert2'


export default function useFormLogic({editingTodo, deleteTodoMutation,emptyTodo}) {

    const [viewTodoItem, setViewTodoItem] = useState(emptyTodo);

    const fireAlertBySwel = (
        icon = "warning",
        title = "Alert",
        text = "Something happened!"
    ) => {
        Swal.fire({
            icon: icon,
            title: title,
            text: text,
            confirmButtonText: "OK"
        });
    };

    const deleteTodoAction = useCallback((todo) => {
        // not block delete if that todo item is not being editing.
        if (editingTodo && editingTodo.id === todo.id) {
            fireAlertBySwel("warning", "Editing in Progress!", "You are editing this todo item. Please cancel editing to delete this item.");
            return;
        }

        // asked user to confirm before deleting
        Swal.fire({
            title: "Do you want to delete the todo?",
            showDenyButton: true,
            confirmButtonText: "Delete",
            denyButtonText: `cancel`
        }).then((result) => {
            if (result.isConfirmed) {
                if (viewTodoItem.id === todo.id) {
                    closeViewTodoComponent();
                }
                deleteTodoMutation.mutate({
                    id: todo.id,
                    key: todo.key,
                    displayName: todo.displayName,
                    description: todo.description,
                    attribute: todo.attribute,
                    completed: false,
                });
                Swal.fire("Delete!", "", "success");
            }
        });
    }, [deleteTodoMutation]);


    const viewTodoComponent = useCallback(todo => {
        setViewTodoItem(todo);
        document.getElementById("todo-item-view-id").style.display = "block";
    }, []);

    const closeViewTodoComponent = useCallback(() => {
        setViewTodoItem(emptyTodo);
        document.getElementById("todo-item-view-id").style.display = "none";
    }, []);

    return {
        viewTodoItem,
        deleteTodoAction,
        viewTodoComponent,
        closeViewTodoComponent
    };
}

