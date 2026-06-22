import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:3001/api", //express
    // baseURL: "http://localhost:5000",  //json-server
    headers: { "Content-Type": "application/json" },
});

api.interceptors.request.use(config => {
    console.log("req");
    const authString = localStorage.getItem("auth_data");
    if (authString) {
        try {
            const authData = JSON.parse(authString);

            if (authData && authData.access_token) {
                config.headers.Authorization = `Bearer ${authData.access_token}`;
                console.log("Token attached successfully");
            }
        } catch (error) {
            console.error("Error parsing auth_data from localStorage:", error);
        }
    } else {
        console.log("No auth_data found in localStorage");
    }
    console.log({ config });
    return config;
});

// Refresh token
api.interceptors.response.use(
    response => {
        console.log({ response });
        return response;
    },
    async error => {
        const originalRequest = error.config;

        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            const authString = localStorage.getItem("auth_data");
            if (authString) {
                try {
                    const authData = JSON.parse(authString);

                    const response = await axios.post(
                        "http://localhost:5000/api/auth/refresh",
                        {
                            refresh_token: authData.refresh_token,
                        },
                    );

                    const { session } = response.data;

                    localStorage.setItem(
                        "auth_data",
                        JSON.stringify({
                            access_token: session.access_token,
                            refresh_token: session.refresh_token,
                            expires_at: session.expires_at,
                        }),
                    );

                    originalRequest.headers.Authorization = `Bearer ${session.access_token}`;

                    return api(originalRequest);
                } catch (refreshError) {
                    console.error("Session expired. Please login again.");
                    localStorage.removeItem("auth_data");
                    localStorage.removeItem("user");
                    // window.location.href = "/login";
                    return Promise.reject(refreshError);
                }
            }
        }

        return Promise.reject(error);
    },
);

export default api;
