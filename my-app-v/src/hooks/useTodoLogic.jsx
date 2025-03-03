import React, { useCallback, useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { fetchTodos, addTodo, updateTodo, deleteTodo } from "../api/api";
import queryClient from "../utils/queryClient";
import Swal from 'sweetalert2'


export default function useFormLogic() {

    const [viewTodoItemContainer, setViewTodoItemContainer] = useState(false);

    // Fetch Todos
    const { data: todos = [], isLoading, error } = useQuery({
        queryKey: ["todos"],
        queryFn: fetchTodos,
        staleTime: 0, // his forces refetch immediately after a mutation
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

    const onSubmit = useCallback((todo,editingTodo) => {
        if(editingTodo){
            updateTodoMutation.mutate(todo);
        }else{
            addTodoMutation.mutate(todo);
        }
    }, [addTodoMutation, updateTodoMutation]);

    return {
        todos,
        isLoading,
        error,
        onSubmit,
        deleteTodoMutation,
        viewTodoItemContainer,
        setViewTodoItemContainer
    };
}