import React, { useCallback, useState } from "react";
import Swal from 'sweetalert2'


export default function useTodoItems({ editingTodo, deleteTodoMutation, emptyTodo, setViewTodoItemContainer }) {

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
            fireAlertBySwel(
                "warning",
                "Editing in Progress!",
                "You are editing this todo item. Please cancel editing to delete this item."
            );
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
                deleteTodoMutation.mutate(
                    {
                        id: todo.id,
                        key: todo.key,
                        displayName: todo.displayName,
                        description: todo.description,
                        attribute: todo.attribute,
                        completed: false,
                    },
                    {
                        onSuccess: () => {
                            fireAlertBySwel("success", "Deleted!", "The todo has been deleted.");
                        },
                        onError: (error) => {
                            fireAlertBySwel("error", "Error!", "Failed to delete the todo.");
                        }
                    }
                );
            }
        });
    }, [deleteTodoMutation]);


    const viewTodoComponent = useCallback(todo => {
        setViewTodoItem(todo);
        setViewTodoItemContainer(true);
    }, []);

    const closeViewTodoComponent = useCallback(() => {
        setViewTodoItem(emptyTodo);
        setViewTodoItemContainer(false);
    }, []);

    return {
        viewTodoItem,
        deleteTodoAction,
        viewTodoComponent,
        closeViewTodoComponent
    };
}

