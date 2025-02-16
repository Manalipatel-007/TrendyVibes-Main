import axios from "axios";

export const API_BASE_URL = 'http://localhost:4000'; // Ensure this matches your server's base URL

const jwt = localStorage.getItem("jwt");

export const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        "Authorization": `Bearer ${jwt}`,
        'Content-Type': "application/json"
    }
});


