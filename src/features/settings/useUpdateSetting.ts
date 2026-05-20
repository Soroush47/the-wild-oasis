import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateSetting } from "../../services/apiSettings";
import toast from "react-hot-toast";

export function useUpdateSetting() {
    const queryClient = useQueryClient();
    const { isPending: isUpdating, mutate: updateMutation } = useMutation({
        mutationFn: updateSetting,
        onSuccess: () => {
            toast.success("Settings updated successfully");
            queryClient.invalidateQueries({
                queryKey: ["settings"],
            });
        },
        onError: () => {
            toast.error("Settings could not update");
        },
    });

    return { isUpdating, updateMutation };
}
