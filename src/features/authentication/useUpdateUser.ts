import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateUser } from "../../services/apiAuth";
import toast from "react-hot-toast";
import { AxiosError } from "axios";
import { handleMutationError } from "../../utils/handlerMutationError";

export function useUpdateUser() {
    const queryClient = useQueryClient();
    const { mutate: updateUserMutation, isPending: isUpdating } = useMutation({
        mutationFn: updateUser,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["user"],
            });
            toast.success("Account updated successfully");
        },
        onError: (error: AxiosError) =>
            handleMutationError(error, "Account could not update"),
    });

    return { updateUserMutation, isUpdating };
}
