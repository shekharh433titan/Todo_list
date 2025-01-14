import React, { createContext, useContext, useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { fetchTodos, addTodo, updateTodo, deleteTodo } from "../api/api";
import MyQueryClient from "./MyQueryClient";

const TodoContext = createContext();

export const TodoProvider = ({ children }) => {
    const queryClient = MyQueryClient();

    const [formData, setFormData] = useState({
        displayName: "",
        key: "",
        description: "",
        attribute: "",
    });

    const [buttonLabel, setButtonLabel] = useState("Submit");
    const [editingTodo, setEditingTodo] = useState(null);

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

    const deleteTodoFun = (todo) => {
        deleteTodoMutation.mutate({
            id: todo.id,
            key: todo.key,
            displayName: todo.displayName,
            description: todo.description,
            attribute: todo.attribute,
            completed: false,
        });
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
                key: formData.key,
                displayName: formData.displayName,
                description: formData.description,
                attribute: formData.attribute,
                completed: false,
            });
            setFormData({
                key: "",
                displayName: "",
                description: "",
                attribute: "",
            });
        }
    };

    const handleEdit = (todo) => {
        setButtonLabel("Update");
        setEditingTodo(todo);
        setFormData(todo);
    };

    const handleSubmitUpdateClick = (e) => {
        if (editingTodo) {
            updateTodoMutation.mutate({
                ...editingTodo,
                ...formData,
            });
            setEditingTodo(null);
            setButtonLabel("Submit");
            setFormData({
                key: "",
                displayName: "",
                description: "",
                attribute: "",
            });
        } else {
            handleSubmit(e);
        }
    };

    const handelCancelClick = () => {
        setEditingTodo(null);
        setButtonLabel("Submit");
        setFormData({
            key: "",
            displayName: "",
            description: "",
            attribute: "",
        });
    };

    return (
        <TodoContext.Provider
            value={{
                formData,
                setFormData,
                buttonLabel,
                editingTodo,
                setEditingTodo,
                todos,
                isLoading,
                error,
                handleChange,
                handleSubmit,
                deleteTodoFun,
                handleSubmitUpdateClick,
                handelCancelClick,
                handleEdit,
            }}
        >
            {children}
        </TodoContext.Provider>
    );
};

export const useTodoLogic = () => {
    return useContext(TodoContext);
};

export default useTodoLogic;