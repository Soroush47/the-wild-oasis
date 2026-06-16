import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateBooking } from "../../services/apiBookings";
import toast from "react-hot-toast";

type Obj = {
    status: "checked-out";
};

const obj = {
    status: "checked-out",
};

export function useCheckout() {
    const queryClient = useQueryClient();
    const { mutate: checkoutMutation, isPending: isCheckingOut } = useMutation({
        mutationFn: (id: number) => updateBooking<Obj>(id, obj as Obj),
        onSuccess: data => {
            toast.success(`Booking #${data.data.id} successfully checked out`);
            queryClient.invalidateQueries({ queryKey: ["booking", data.data.id] });
            queryClient.invalidateQueries({
                queryKey: ["bookings"],
                // refetchType: "none",
            });
        },
        onError: () => toast.error("The booking could not be check out"),
    });

    return { checkoutMutation, isCheckingOut };
}
