import { useState, useCallback } from "react";
import Swal from "sweetalert2";

export default function useTodoForm({onSubmit, todos, setViewTodoItemContainer}) {

    const emptyTodo = {
        displayName: "",
        key: "",
        description: "",
        attribute: "",
    }

    const [formData, setFormData] = useState(emptyTodo);
    const [editingTodo, setEditingTodo] = useState(null);
    const [buttonLabel, setButtonLabel] = useState("Submit");

    // SweetAlert wrapper
    const fireAlert = (icon, title, text) => {
        Swal.fire({ icon, title, text, confirmButtonText: "OK" });
    };

    // Handle input changes
    const handleChange = useCallback((e) => {
        const { id, value } = e.target;
        setFormData((prev) => ({ ...prev, [id]: value }));
    }, []);

    // Validate form data
    const validateForm = useCallback(() => {
        const { key, displayName, description, attribute } = formData;

        if (!key.trim() || !displayName.trim() || !description.trim() || !attribute.trim()) {
            return { isValid: false, message: "All fields must be filled with non-empty values." };
        }

        if (!editingTodo) {
            const isKeyDuplicate = todos.some(todo => todo.key === key);
            if (isKeyDuplicate) {
                return { isValid: false, message: "Key already exists. Please use a unique key." };
            }
        }

        return { isValid: true, message: "Validation successful." };
    }, [formData, editingTodo, todos]);

    // Handle form submission
    const handleSubmit = useCallback((e) => {
        e.preventDefault();
        const validationRes = validateForm();
        if (!validationRes.isValid) {
            fireAlert("error", "Validation Error!", validationRes.message);
            return false;
        }
        onSubmit({ ...formData, completed: false }, editingTodo);
        resetForm();
    }, [formData, editingTodo, validateForm, onSubmit]);

    // Edit a todo
    const handleEdit = useCallback((todo) => {
        setViewTodoItemContainer(false);
        setEditingTodo(todo);
        setFormData(todo);
        setButtonLabel("Update");
    }, []);

    // Cancel editing
    const cancelEdit = useCallback(() => {
        resetForm();
    }, []);

    // Reset form state
    const resetForm = () => {
        setFormData(emptyTodo);
        setEditingTodo(null);
        setButtonLabel("Submit");
    };

    return {
        emptyTodo,
        formData,
        buttonLabel,
        editingTodo,
        handleChange,
        handleSubmit,
        handleEdit,
        cancelEdit,
    };
}
