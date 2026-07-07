import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { createCabin } from "../../services/apiCabins";
import { AxiosError } from "axios";
import { handleMutationError } from "../../utils/handlerMutationError";

export function useCreateCabin() {
    const queryClient = useQueryClient();
    const { mutate: createMutation, isPending: isCreating } = useMutation({
        mutationFn: createCabin,
        onSuccess: () => {
            toast.success("New cabin created successfully");
            queryClient.invalidateQueries({
                queryKey: ["cabins"],
            });
        },
        onError: (error: AxiosError) =>
            handleMutationError(error, "Cabin could not be created"),
    });

    return { isCreating, createMutation };
}
