import axios from "axios";
const API_URL = "http://localhost:3001/todos";

export const fetchTodos = async () => {
    const response = await axios.get(API_URL);
    return response.data;
};

export const addTodo = async (newTodo) => {
    console.log(newTodo);
    const response = await axios.post(API_URL, newTodo);
    return response.data;
};

export const updateTodo = async (updatedTodo) => {
    const response = await axios.put(`${API_URL}/${updatedTodo.id}`, updatedTodo);
    return response.data;
};

export const deleteTodo = async (req) => {
    // console.log(req);
    await axios.delete(`${API_URL}/${req.id}`);
};
