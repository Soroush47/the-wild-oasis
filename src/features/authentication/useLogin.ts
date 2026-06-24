import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { AxiosError } from "axios";

import toast from "react-hot-toast";

import { loginUser } from "../../services/apiAuth";

interface BackendError {
    message: string;
}

export function useLogin() {
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    const {
        data,
        isPending: isLogingIn,
        mutate: loginMutation,
    } = useMutation({
        mutationFn: loginUser,
        onSuccess: data => {
            const user = data?.user;
            queryClient.setQueryData(["user"], user);
            console.log("log in successfully");
            navigate("/dashboard");
        },
        onError: error => {
            const axiosError = error as AxiosError<BackendError>;
            const message = axiosError.response?.data?.message || "User could not log in";

            toast.error(message);
        },
    });

    return { data, isLogingIn, loginMutation };
}
