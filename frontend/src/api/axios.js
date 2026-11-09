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

// Stores a callback provided by React.
let onTokenRefresh = null;

// Allows React to register its state setter.
export function setOnTokenRefresh(callback) {
    onTokenRefresh = callback;
}


// Callback for logging out the user.
let onLogout = null;

export function setOnLogout(callback) {
    onLogout = callback;
}

api.interceptors.request.use(
    (config) => {
        if (accessToken) {
            config.headers.Authorization = `Bearer ${accessToken}`;
        }

        return config;
    }
);
api.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        if (
            error.response &&
            error.response.status === 401 &&
            error.config &&
            accessToken &&
            error.config.url !== "auth/refresh/" &&
            !error.config._retry
        ) {
            error.config._retry = true;

            return api.post("auth/refresh/")
                .then((response) => {
                    const newToken = response.data.access;

                    setAuthToken(newToken);
                    onTokenRefresh?.(newToken);

                    return api.request(error.config);
                });
        }
        return Promise.reject(error);
    }
);
export default api;