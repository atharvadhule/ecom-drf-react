import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:8000/api/",
    headers: {
        "Content-Type": "application/json",
    },
    withCredentials: true,
});

// har baar hame access token ko manually set karna padega, isliye hum ek variable banate hain jisme access token store hoga
let accessToken = null;

export function setAuthToken(token) {
    accessToken = token;
}
api.interceptors.request.use(
    (config) => {
        if (accessToken) {
            config.headers.Authorization = `Bearer ${accessToken}`;
        }

        return config;
    }
);
export default api;