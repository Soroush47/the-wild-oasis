import { useMutation } from "@tanstack/react-query";
import { signupUser } from "../../services/apiAuth";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { AxiosError } from "axios";

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
            toast.success("User signed up seccessfully");
            navigate("/login");
        },
        onError: err => {
            const axiosError = err as AxiosError<BackendError>;
            const message =
                axiosError.response?.data?.message || "User could not sign up";

            toast.error(message);
        },
    });

    const user = data?.data;
    user && console.log({ user });
    return { isSigningUp, signupMutation };
}
