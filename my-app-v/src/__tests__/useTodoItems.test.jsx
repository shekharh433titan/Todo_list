import { renderHook, act } from "@testing-library/react";
import Swal from "sweetalert2";
import useTodoItems from "../hooks/useTodoItems";

jest.mock("sweetalert2", () => ({
  fire: jest.fn(() => Promise.resolve({ isConfirmed: true }))
}));

describe("useTodoItems Hook", () => {
  let deleteTodoMutation;
  let setViewTodoItemContainer;
  const emptyTodo = { id: null };
  const sampleTodo = { id: 1, key: "task-1", displayName: "Sample Task", description: "Test task", attribute: "urgent" };

  beforeEach(() => {
    deleteTodoMutation = {
      mutate: jest.fn((_, { onSuccess }) => onSuccess())
    };
    setViewTodoItemContainer = jest.fn();
  });

  it("should set viewTodoItem when viewing a todo", () => {
    const { result } = renderHook(() => useTodoItems({ editingTodo: null, deleteTodoMutation, emptyTodo, setViewTodoItemContainer }));
    
    act(() => {
      result.current.viewTodoComponent(sampleTodo);
    });
    
    expect(result.current.viewTodoItem).toEqual(sampleTodo);
    expect(setViewTodoItemContainer).toHaveBeenCalledWith(true);
  });

  it("should reset viewTodoItem when closing the view", () => {
    const { result } = renderHook(() => useTodoItems({ editingTodo: null, deleteTodoMutation, emptyTodo, setViewTodoItemContainer }));
    
    act(() => {
      result.current.viewTodoComponent(sampleTodo);
      result.current.closeViewTodoComponent();
    });
    
    expect(result.current.viewTodoItem).toEqual(emptyTodo);
    expect(setViewTodoItemContainer).toHaveBeenCalledWith(false);
  });

  it("should not delete todo if it is being edited", () => {
    const { result } = renderHook(() => useTodoItems({ editingTodo: sampleTodo, deleteTodoMutation, emptyTodo, setViewTodoItemContainer }));
    
    act(() => {
      result.current.deleteTodoAction(sampleTodo);
    });
    
    expect(Swal.fire).toHaveBeenCalledWith(expect.objectContaining({ title: "Editing in Progress!" }));
    expect(deleteTodoMutation.mutate).not.toHaveBeenCalled();
  });

  it("should delete todo if confirmed", async () => {
    const { result } = renderHook(() => useTodoItems({ editingTodo: null, deleteTodoMutation, emptyTodo, setViewTodoItemContainer }));
    
    await act(async () => {
      await result.current.deleteTodoAction(sampleTodo);
    });
    
    expect(Swal.fire).toHaveBeenCalledWith(expect.objectContaining({ title: "Do you want to delete the todo?" }));
    expect(deleteTodoMutation.mutate).toHaveBeenCalledWith(
      expect.objectContaining({ id: sampleTodo.id }),
      expect.objectContaining({
        onSuccess: expect.any(Function),
        onError: expect.any(Function)
      })
    );
  });

  it("should show success alert on successful deletion", async () => {
    const { result } = renderHook(() => useTodoItems({ editingTodo: null, deleteTodoMutation, emptyTodo, setViewTodoItemContainer }));
    
    await act(async () => {
      await result.current.deleteTodoAction(sampleTodo);
    });
    
    expect(Swal.fire).toHaveBeenCalledWith(expect.objectContaining({ title: "Deleted!" }));
  });
});
