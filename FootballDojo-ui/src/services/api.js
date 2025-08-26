import axios from 'axios';

const API_BASE = import.meta.env.VITE_API_BASE_URL;

console.log(API_BASE); // should print your URL

export const api = axios.create({
    baseURL: API_BASE
});