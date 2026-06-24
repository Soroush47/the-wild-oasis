import api from "../configs/api";

interface User {
    fullName: string;
    email: string;
    password: string;
}

export const signupUser = async (user: User) => await api.post("/auth/sign-up", user);

interface Login {
    email: string;
    password: string;
}

export const loginUser = async ({ email, password }: Login) => {
    const response = await api.post("/auth/log-in", { email, password });
    const { session, user } = response.data;

    localStorage.setItem(
        "auth_data",
        JSON.stringify({
            access_token: session.access_token,
            refresh_token: session.refresh_token,
            expires_at: session.expires_at,
        }),
    );
    localStorage.setItem("user", JSON.stringify(user));

    return response.data;
};

export const getMe = async () => {
    const response = await api.get("/auth/me");
    return response.data?.user;
};
