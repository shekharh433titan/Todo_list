import React, { useCallback, useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { fetchTodos, addTodo, updateTodo, deleteTodo } from "../../api/api";
import queryClient from "../MyQueryClient";


export default function useFormLogic() {

    const emptyTodo = {
        displayName: "",
        key: "",
        description: "",
        attribute: "",
    }

    const [formData, setFormData] = useState(emptyTodo);
    const [buttonLabel, setButtonLabel] = useState("Submit");
    const [editingTodo, setEditingTodo] = useState(null);
    const [viewTodoItem, setViewTodoItem] = useState(emptyTodo);

    // Fetch Todos
    const { data: todos = [], isLoading, error } = useQuery({
        queryKey: ["todos"],
        queryFn: fetchTodos,
    });

    const addTodoMutation = useMutation({
        mutationFn: addTodo,
        onSuccess: () => {
            queryClient.invalidateQueries(["todos"]);
        },
    });

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
    });

    const deleteTodoFun = useCallback((todo) => {
        deleteTodoMutation.mutate({
            id: todo.id,
            key: todo.key,
            displayName: todo.displayName,
            description: todo.description,
            attribute: todo.attribute,
            completed: false,
        });
    }, [deleteTodoMutation]);

    const handleChange = useCallback((e) => {
        const { id, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [id]: value,
        }));
    }, []);

    const validateTodoBeforeAdd = useCallback(() => {
        const { key, displayName, description, attribute } = formData;

        if (!key.trim() || !displayName.trim() || !description.trim() || !attribute.trim()) {
            return { isValid: false, message: "All fields must be filled with non-empty values." };
        }

        if (editingTodo) {
            return { isValid: true, message: "Validation successful." };
        }

        const isKeyDuplicate = todos.some(todo => todo.key === key);
        if (isKeyDuplicate) {
            return { isValid: false, message: "Key already exists. Please use a unique key." };
        }

        return { isValid: true, message: "Validation successful." };
    }, [formData, editingTodo, todos]);

    const handleSubmit = useCallback((e) => {
        e.preventDefault();
        const validationRes = validateTodoBeforeAdd();
        if (validationRes.isValid) {
            addTodoMutation.mutate({
                key: formData.key,
                displayName: formData.displayName,
                description: formData.description,
                attribute: formData.attribute,
                completed: false,
            });
            setFormData(emptyTodo);
        } else {
            console.log("Failed to add todo items: ", validationRes.message);
        }
    }, [addTodoMutation, formData, validateTodoBeforeAdd]);

    const handleEdit = useCallback(todo => {
        setButtonLabel("Update");
        setEditingTodo(todo);
        setFormData(todo);
    }, []);

    const handleSubmitUpdateClick = useCallback((e) => {
        if (editingTodo) {
            const validationRes = validateTodoBeforeAdd();
            if (validationRes.isValid) {
                updateTodoMutation.mutate({
                    ...editingTodo,
                    ...formData,
                });
            } else {
                console.log("Failed to update todo items: ", validationRes.message);
            }
            setEditingTodo(null);
            setButtonLabel("Submit");
            setFormData(emptyTodo);
        } else {
            handleSubmit(e);
        }
    }, [editingTodo, formData, updateTodoMutation, validateTodoBeforeAdd, handleSubmit]);

    const handelCancelClick = useCallback(() => {
        setEditingTodo(null);
        setButtonLabel("Submit");
        setFormData(emptyTodo);
    }, []);

    const viewTodoComponent = useCallback(todo => {
        setViewTodoItem(todo);
        document.getElementById("todo-item-view-id").style.display = "block";
    }, []);

    const closeViewTodoComponent = useCallback(() => {
        setViewTodoItem(emptyTodo);
        document.getElementById("todo-item-view-id").style.display = "none";
    }, []);

    return {
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
    };
}