import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { SignupFormSchema, FormData } from "./signupFormSchema";

export function useSignupForm() {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<FormData>({
        resolver: zodResolver(SignupFormSchema),
    });

    return { register, handleSubmit, reset, errors };
}
