import { renderHook, act } from "@testing-library/react-hooks";
import useTodoForm from "../hooks/useTodoForm";
import Swal from "sweetalert2";

jest.mock("sweetalert2", () => ({
    fire: jest.fn(),
}));

describe("useTodoForm Hook", () => {
    const mockOnSubmit = jest.fn();
    const mockSetViewTodoItemContainer = jest.fn();

    const sampleTodo = {
        displayName: "Test Todo",
        key: "test-key",
        description: "Test description",
        attribute: "Test attribute",
        completed: false,
    };

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("should initialize with empty form data", () => {
        const { result } = renderHook(() => useTodoForm({
            onSubmit: mockOnSubmit,
            todos: [],
            setViewTodoItemContainer: mockSetViewTodoItemContainer,
        }));

        expect(result.current.formData).toEqual({
            displayName: "",
            key: "",
            description: "",
            attribute: "",
        });
        expect(result.current.buttonLabel).toBe("Submit");
    });

    it("should update form data on change", () => {
        const { result } = renderHook(() => useTodoForm({
            onSubmit: mockOnSubmit,
            todos: [],
            setViewTodoItemContainer: mockSetViewTodoItemContainer,
        }));

        act(() => {
            result.current.handleChange({ target: { id: "displayName", value: "New Todo" } });
        });

        expect(result.current.formData.displayName).toBe("New Todo");
    });

    it("should not submit if validation fails", () => {
        const { result } = renderHook(() => useTodoForm({
            onSubmit: mockOnSubmit,
            todos: [],
            setViewTodoItemContainer: mockSetViewTodoItemContainer,
        }));

        act(() => {
            result.current.handleSubmit({ preventDefault: jest.fn() });
        });

        expect(Swal.fire).toHaveBeenCalledWith({
            icon: "error",
            title: "Validation Error!",
            text: "All fields must be filled with non-empty values.",
            confirmButtonText: "OK",
        });
        expect(mockOnSubmit).not.toHaveBeenCalled();
    });

    it("should submit form data successfully", () => {
        const { result } = renderHook(() => useTodoForm({
            onSubmit: mockOnSubmit,
            todos: [],
            setViewTodoItemContainer: mockSetViewTodoItemContainer,
        }));

        act(() => {
            result.current.handleChange({ target: { id: "displayName", value: "Test Todo" } });
            result.current.handleChange({ target: { id: "key", value: "test-key" } });
            result.current.handleChange({ target: { id: "description", value: "Test description" } });
            result.current.handleChange({ target: { id: "attribute", value: "Test attribute" } });
        });

        act(() => {
            result.current.handleSubmit({ preventDefault: jest.fn() });
        });

        expect(mockOnSubmit).toHaveBeenCalledWith(expect.objectContaining(sampleTodo), null);
    });

    it("should set form data when editing a todo", () => {
        const { result } = renderHook(() => useTodoForm({
            onSubmit: mockOnSubmit,
            todos: [sampleTodo],
            setViewTodoItemContainer: mockSetViewTodoItemContainer,
        }));

        act(() => {
            result.current.handleEdit(sampleTodo);
        });

        expect(result.current.formData).toEqual(sampleTodo);
        expect(result.current.buttonLabel).toBe("Update");
    });

    it("should reset the form on cancel", () => {
        const { result } = renderHook(() => useTodoForm({
            onSubmit: mockOnSubmit,
            todos: [sampleTodo],
            setViewTodoItemContainer: mockSetViewTodoItemContainer,
        }));

        act(() => {
            result.current.handleEdit(sampleTodo);
        });

        act(() => {
            result.current.cancelEdit();
        });

        expect(result.current.formData).toEqual({
            displayName: "",
            key: "",
            description: "",
            attribute: "",
        });
        expect(result.current.buttonLabel).toBe("Submit");
    });
});
