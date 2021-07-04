import axios from "axios";

export const api = axios.create({
    baseURL: `${window.location.origin}/api`,
    timeout: 10000
});
