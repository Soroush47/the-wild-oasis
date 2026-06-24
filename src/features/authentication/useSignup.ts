import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { AxiosError } from "axios";
import toast from "react-hot-toast";

import { signupUser } from "../../services/apiAuth";

interface BackendError {
    message: string;
}

export function useSignup() {
    const navigate = useNavigate();
    const {
        data,
        isPending: isSigningUp,
        mutate: signupMutation,
    } = useMutation({
        mutationFn: signupUser,
        onSuccess: () => {
            toast.success("Account successfully created!");
            navigate("/login");
        },
        onError: error => {
            const axiosError = error as AxiosError<BackendError>;
            const message =
                axiosError.response?.data?.message || "User could not sign up";

            toast.error(message);
        },
    });

    const user = data?.data;
    user && console.log({ user });
    return { isSigningUp, signupMutation };
}
