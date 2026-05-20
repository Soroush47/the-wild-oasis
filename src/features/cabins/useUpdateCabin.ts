import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateCabin } from "../../services/apiCabins";
import toast from "react-hot-toast";

export function useUpdateCabin() {
    const queryClient = useQueryClient();
    const { mutate: updateMutation, isPending: isUpdating } = useMutation({
        mutationFn: updateCabin,
        onSuccess: () => {
            toast.success("The cabin edited succesfully");
            queryClient.invalidateQueries({
                queryKey: ["cabins"],
            });
        },
        onError: () => toast.error("The cabin could not be edited"),
    });

    return { isUpdating, updateMutation };
}
