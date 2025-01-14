import React, { createContext, useContext, useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { fetchTodos, addTodo, updateTodo, deleteTodo } from "../api/api";
import MyQueryClient from "./MyQueryClient";


// If you want to initialize this hook once for reuse across components, 
// consider using a React Context to share the logic and state globally 
// while ensuring proper React Hook rules are followed.

const TodoContext = createContext();

export const TodoProvider = ({ children }) => {

    const emptyTodo = {
        displayName: "",
        key: "",
        description: "",
        attribute: "",
    }

    const queryClient = MyQueryClient();

    const [formData, setFormData] = useState(emptyTodo);

    const [buttonLabel, setButtonLabel] = useState("Submit");
    const [editingTodo, setEditingTodo] = useState(null);
    const [viewTodoItem, setViewTodoItem] = useState(emptyTodo);

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
            setFormData(emptyTodo);
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
            setFormData(emptyTodo);
        } else {
            handleSubmit(e);
        }
    };

    const handelCancelClick = () => {
        setEditingTodo(null);
        setButtonLabel("Submit");
        setFormData(emptyTodo);
    };

    const viewTodo = (todo) => {
        console.log(todo);
        setViewTodoItem(todo);
        const detailsDiv = document.getElementById("todo-item-view-id");
        detailsDiv.style.display = "block"; // Show details
    };

    const closeViewTodoComp = () => {
        // console.log(todo);
        setViewTodoItem(emptyTodo);
        const detailsDiv = document.getElementById("todo-item-view-id");
        detailsDiv.style.display = "none"; // Show details
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
                viewTodo,
                viewTodoItem,
                closeViewTodoComp
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