import { useMutation, useQueryClient } from "@tanstack/react-query";
import { editCabin } from "../../services/apiCabins";
import toast from "react-hot-toast";

export function useEditCabin() {
    const queryClient = useQueryClient();
    const { mutate: editMutation, isPending: isEditing } = useMutation({
        mutationFn: editCabin,
        onSuccess: () => {
            toast.success("The cabin edited succesfully");
            queryClient.invalidateQueries({
                queryKey: ["cabins"],
            });
        },
        onError: () => toast.error("The cabin could not be edited"),
    });

    return { isEditing, editMutation };
}
