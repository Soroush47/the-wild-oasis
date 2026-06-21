import api from "../configs/api";

interface User {
    fullName: string;
    email: string;
    password: string;
}

export const signupUser = async (user: User) => await api.post("/auth/sign-up", user);
