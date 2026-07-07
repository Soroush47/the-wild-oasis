import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteBooking } from "../../services/apiBookings";
import toast from "react-hot-toast";
import { AxiosError } from "axios";
import { handleMutationError } from "../../utils/handlerMutationError";

export function useDeleteBooking() {
    const queryClient = useQueryClient();

    const { isPending: isDeleting, mutate: deleteMutation } = useMutation({
        mutationFn: deleteBooking,
        onSuccess: () => {
            toast.success("Booking successfully deleted");
            queryClient.invalidateQueries({
                queryKey: ["bookings"],
            });
        },
        onError: (error: AxiosError) =>
            handleMutationError(error, "Booking could not be deleted"),
    });

    return { isDeleting, deleteMutation };
}
