import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { UpdatePasswordFormSchema, FormData } from "./updatePasswordFormSchema";

export function useUpdatePasswordForm() {
    const {
        register,
        handleSubmit,
        getValues,
        reset,
        formState: { errors },
    } = useForm<FormData>({
        resolver: zodResolver(UpdatePasswordFormSchema),
    });

    return { register, handleSubmit, reset, errors, getValues };
}
