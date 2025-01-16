import axios from "axios";
const API_URL = "http://localhost:3001/todos";

export const fetchTodos = async () => {
    try{
        const response = await axios.get(API_URL);
        return response.data;
    }
    catch (error) {
        handlesError(error);
        return [];
    }
};

export const addTodo = async (newTodo) => {
    try{

        const response = await axios.post(API_URL, newTodo);
        return response.data;
    }
    catch (error){
        handlesError(error);
        return error;
    }
};

export const updateTodo = async (updatedTodo) => {
    try{

        const response = await axios.put(`${API_URL}/${updatedTodo.id}`, updatedTodo);
        return response.data;
    }
    catch (error){
        handlesError(error);
        return error;
    }
};

export const deleteTodo = async (req) => {
    try {
        const response = await axios.delete(`${API_URL}/${req.id}`);
        return response;
    }
    catch (error) {
        handlesError(error);
        return error;
    }
};


function handlesError(error){
    if (error.response) {
        if (error.response.status === 404) {
            console.error("Todo not added/found");
        } else {
            console.error("Server error:", error.response.status);
        }
    } else if (error.request) {
        console.error("No response received:", error.request);
    } else {
        console.error("Error setting up request:", error.message);
    }
}
