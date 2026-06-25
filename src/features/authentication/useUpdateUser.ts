import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateUser } from "../../services/apiAuth";
import toast from "react-hot-toast";

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
        onError: () => {
            toast.error("Account could not update");
        },
    });

    return { updateUserMutation, isUpdating };
}
