import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateCabin } from "../../services/apiCabins";
import toast from "react-hot-toast";
import { AxiosError } from "axios";
import { handleMutationError } from "../../utils/handlerMutationError";

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
        onError: (error: AxiosError) =>
            handleMutationError(error, "The cabin could not be edited"),
    });

    return { isUpdating, updateMutation };
}
