import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { fetchTodos, addTodo, updateTodo, deleteTodo } from "../api/api";

const useTodoLogic = (queryClient) => {

    const [formData, setFormData] = useState({
        displayName: "",
        key: "",
        description: "",
        attribute: "",
    });

    const [editingTodo, setEditingTodo] = useState(null);

    // Fetch todos
    const { data: todos = [], isLoading, error } = useQuery({
        queryKey: ["todos"],
        queryFn: fetchTodos,
    });

    // Add todo mutation
    const addTodoMutation = useMutation({
        mutationFn: addTodo,
        onSuccess: () => {
            queryClient.invalidateQueries(["todos"]);
        },
    });

    // Update todo mutation
    const updateTodoMutation = useMutation({
        mutationFn: updateTodo,
        onSuccess: () => {
            queryClient.invalidateQueries(["todos"]);
        },
    });

    // Delete todo mutation
    const deleteTodoMutation = useMutation({
        mutationFn: deleteTodo,
        onSuccess: () => {
            queryClient.invalidateQueries(["todos"]);
        },
    });

    // Handlers
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

    // // still not test
    // // Load a todo into the form for editing call by todo_item jsx
    const handleEdit = (todo) => {
        const submitUpdateButton = document.getElementById("submit-update-btn");
        if (submitUpdateButton) {
            submitUpdateButton.innerText = "Update";
        }
        setEditingTodo(todo);
        setFormData({
            key: todo.key,
            displayName: todo.displayName,
            description: todo.description,
            attribute: todo.attribute,
        });
    };

    const handleSubmitUpdateClick = (e) => {
        if (editingTodo) {
            handleUpdate(e);
        } else {
            handleSubmit(e);
        }
    };

    const handelCancelClick = () => {
        if (editingTodo) {
            setEditingTodo(null); // Reset editing state
            const submitUpdateButton = document.getElementById("submit-update-btn");
            if (submitUpdateButton) {
                submitUpdateButton.innerText = "Submit";
            }
            setFormData({
                key: "",
                displayName: "",
                description: "",
                attribute: "",
            });
        }
    }

    return {
        formData,
        setFormData,
        editingTodo,
        setEditingTodo,
        todos,
        isLoading,
        error,
        handleChange,
        handleSubmit,
        addTodoMutation,
        updateTodoMutation,
        deleteTodoMutation,
        handleSubmitUpdateClick,
        handelCancelClick,
        handleEdit
    };
};

export default useTodoLogic;