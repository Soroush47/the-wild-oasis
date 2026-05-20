import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteCabin } from "../../services/apiCabins";
import toast from "react-hot-toast";

export function useDeleteCabin() {
    const queryClient = useQueryClient();

    const { isPending: isDeleting, mutate: deleteMutation } = useMutation({
        mutationFn: (id: number) => deleteCabin(id),
        onSuccess: () => {
            toast.success("Cabin successfully deleted");
            queryClient.invalidateQueries({
                queryKey: ["cabins"],
            });
        },
        onError: () => toast.error("Cabin could not be deleted"),
    });

    return { isDeleting, deleteMutation };
}
