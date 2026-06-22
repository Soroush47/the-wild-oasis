import { useMutation } from "@tanstack/react-query";
import { loginUser } from "../../services/apiAuth";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { AxiosError } from "axios";

interface BackendError {
    message: string;
}

export function useLogin() {
    const navigate = useNavigate();
    const {
        data,
        isPending: isLogingIn,
        mutate: loginMutation,
    } = useMutation({
        mutationFn: loginUser,
        onSuccess: () => {
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
