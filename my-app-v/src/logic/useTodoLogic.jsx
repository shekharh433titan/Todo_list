import React, { createContext, useContext, useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { fetchTodos, addTodo, updateTodo, deleteTodo } from "../api/api";
import MyQueryClient from "./MyQueryClient";


// If you want to initialize this hook once for reuse across components, 
// consider using a React Context to share the logic and state globally 
// while ensuring proper React Hook rules are followed.

// createContext: Creates a Context object for global state management.
// useContext: A hook to consume the context value.
// useState: A hook for managing component-level state (not used in this code but often paired with context for state management).

const TodoContext = createContext();

// The TodoProvider is a React component that acts as the provider for the TodoContext.
// Props:
// 1. children: Represents the child components that will be wrapped by the TodoProvider.

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

    const validateTodoBeforeAdd = () => {
        const { key, displayName, description, attribute } = formData;

        // Check if any field is empty or contains only whitespace
        if (
            !key.trim() ||
            !displayName.trim() ||
            !description.trim() ||
            !attribute.trim()
        ) {
            return { isValid: false, message: "All fields must be filled with non-empty values." };
        }

        // not check for key is unique or not
        if (editingTodo) {
            return { isValid: true, message: "Validation successful." };
        }

        // Check if key is unique or not
        const isKeyDuplicate = todos.some((todo) => todo.key === key);
        if (isKeyDuplicate) {
            return { isValid: false, message: "Key already exists. Please use a unique key." };
        }

        // If all validations pass
        return { isValid: true, message: "Validation successful." };
    };


    const handleSubmit = (e) => {
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
    };

    const handleEdit = (todo) => {
        setButtonLabel("Update");
        setEditingTodo(todo);
        setFormData(todo);
    };

    const handleSubmitUpdateClick = (e) => {
        if (editingTodo) {
            const validationRes = validateTodoBeforeAdd();
            if (validationRes.isValid) {
                updateTodoMutation.mutate({
                    ...editingTodo,
                    ...formData,
                });
            }else{
                console.log("Failed to update todo items: ", validationRes.message);
            }
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

    const viewTodoComponent = (todo) => {
        // console.log(todo);
        setViewTodoItem(todo);
        const detailsDiv = document.getElementById("todo-item-view-id");
        detailsDiv.style.display = "block"; // Show details
    };

    const closeViewTodoComponent = () => {
        // console.log(todo);
        setViewTodoItem(emptyTodo);
        const detailsDiv = document.getElementById("todo-item-view-id");
        detailsDiv.style.display = "none"; // Show details
    };


    // The TodoContext.Provider wraps the children components, 
    // making the provided value accessible to any component within this context tree.

    // The {value} prop is an object that contains the data or functions 
    // that should be shared with the context consumers (like wrap component)

    return (
        <TodoContext.Provider
            value={{
                formData,
                buttonLabel,
                todos,
                isLoading,
                error,
                handleChange,
                handleSubmit,
                deleteTodoFun,
                handleSubmitUpdateClick,
                handelCancelClick,
                handleEdit,
                viewTodoItem,
                viewTodoComponent,
                closeViewTodoComponent
            }}
        >
            {children}
        </TodoContext.Provider>
    );
};

export const useTodoLogic = () => {
    // useTodoLogic is a custom hook that simplifies consuming the TodoContext.
    // It uses useContext(TodoContext) to get the context value.
    // This custom hook makes the context usage cleaner and abstracts away the direct use of useContext.
    return useContext(TodoContext);
};

export default useTodoLogic;