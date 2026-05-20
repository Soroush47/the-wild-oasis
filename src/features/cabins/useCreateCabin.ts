import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { createCabin } from "../../services/apiCabins";



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
        onError: () => toast.error("Cabin could not be created"),
    });

    return { isCreating, createMutation };
}
