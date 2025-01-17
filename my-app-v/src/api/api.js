import axios from "axios";
const API_URL = "http://localhost:3001/todos";

// Create an Axios instance
const apiClient = axios.create({
    baseURL: API_URL,
    headers: {
        "Content-Type": "application/json",
    },
});

// Add request interceptor
apiClient.interceptors.request.use(
    (config) => {
        // console.log(`Sending request to ${config.url}`, config);
        return config;
    },
    (error) => {
        // console.error("Request error:", error);
        return Promise.reject(error);
    }
);

// Add response interceptor
apiClient.interceptors.response.use(
    (response) => {
        // console.log(`Response received from ${response.config.url}:`, response);
        return response;
    },
    (error) => {
        handleGlobalError(error);
        return Promise.reject(error);
    }
);

// Centralized Error Handler
function handleGlobalError(error) {
    if (error.response) {
        console.error(`Error ${error.response.status}: ${error.response.data}`);
    } else if (error.request) {
        console.error("⚠️ No response received:", error.request);
    } else {
        console.error("Request setup error:", error.message);
    }
}

// API Functions
export const fetchTodos = async () => {
    const response = await apiClient.get("/");
    return response.data;
};

export const addTodo = async (newTodo) => {
    const response = await apiClient.post("/", newTodo);
    return response.data;
};

export const updateTodo = async (updatedTodo) => {
    const response = await apiClient.put(`/${updatedTodo.id}`, updatedTodo);
    return response.data;
};

export const deleteTodo = async (id) => {
    await apiClient.delete(`/${id}`);
};