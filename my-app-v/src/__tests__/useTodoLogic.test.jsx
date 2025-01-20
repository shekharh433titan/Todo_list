import React from "react";
import { renderHook, act } from "@testing-library/react-hooks";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import useFormLogic from "../hooks/useTodoLogic";
import { waitFor } from "@testing-library/react";
import * as api from "../api/api";

// Mock API calls
jest.mock("../api/api", () => ({
    fetchTodos: jest.fn(),
    addTodo: jest.fn(),
    updateTodo: jest.fn(),
    deleteTodo: jest.fn(),
}));

const queryClient = new QueryClient();

const wrapper = ({ children }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);

describe("useFormLogic Hook", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    const sampleTodos = {
        "id": "331b",
        "displayName": "xzx",
        "key": "xzxxzdx",
        "description": "xz",
        "attribute": "xzx",
        "completed": false
    }

    it("should fetch todos successfully", async () => {
        api.fetchTodos.mockResolvedValueOnce([sampleTodos]);

        const { result, waitForNextUpdate } = renderHook(() => useFormLogic(), { wrapper });

        expect(result.current.isLoading).toBe(true);
        await waitForNextUpdate();

        expect(result.current.todos).toEqual([sampleTodos]);
        expect(result.current.isLoading).toBe(false);
    });

    // ****
    it("should handle API error on fetch", async () => {
        api.fetchTodos.mockRejectedValueOnce(new Error("Fetch failed"));

        try {
            const { result } = renderHook(() => useFormLogic(), { wrapper });
            console.log(result.current);
            console.log(result.current.error);
            console.log(result.current.todos);

            await waitFor(() => expect(result.current.error).toBeTruthy());
            expect(result.current.todos).toEqual([]);
        }
        catch (error) {
            console.log(error);
        }
    });

    it("should add a todo and refetch", async () => {
        api.addTodo.mockResolvedValueOnce(sampleTodos);
        api.fetchTodos.mockResolvedValueOnce([sampleTodos]);

        const { result, waitForNextUpdate } = renderHook(() => useFormLogic(), { wrapper });
        act(() => {
            result.current.onSubmit(sampleTodos, false);
        });

        await waitForNextUpdate();
        expect(api.addTodo).toHaveBeenCalledWith(sampleTodos);
        expect(result.current.todos).toEqual([sampleTodos]);
    });

    it("should update a todo and refetch", async () => {
        api.updateTodo.mockResolvedValueOnce(sampleTodos);
        api.fetchTodos.mockResolvedValueOnce([sampleTodos]);

        const { result, waitForNextUpdate } = renderHook(() => useFormLogic(), { wrapper });
        act(() => {
            result.current.onSubmit(sampleTodos, true);
        });
        await waitForNextUpdate();
        expect(api.updateTodo).toHaveBeenCalledWith(sampleTodos);
        expect(result.current.todos).toEqual([sampleTodos]);
    });

    it("should delete a todo and refetch", async () => {
        api.deleteTodo.mockResolvedValueOnce(true);
        api.fetchTodos.mockResolvedValueOnce([]);
        const { result, waitForNextUpdate } = renderHook(() => useFormLogic(), { wrapper });
        act(() => {
            result.current.deleteTodoMutation.mutate(1);
        });
        await waitForNextUpdate();
        expect(api.deleteTodo).toHaveBeenCalledWith(1);
        expect(result.current.todos).toEqual([]);
    });
});


// should fetch todos successfully
// should handle API error on fetch