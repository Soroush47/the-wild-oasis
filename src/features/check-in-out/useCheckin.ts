import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateBooking } from "../../services/apiBookings";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const obj = {
    isPaid: true,
    status: "checked-in",
};

export function useCheckin() {
    const queryClient = useQueryClient();
    const naviagate = useNavigate();
    const { mutate: checkinMutation, isPending: isCheckingIn } = useMutation({
        mutationFn: (id: number) => updateBooking<typeof obj>(id, obj),
        onSuccess: data => {
            toast.success(`Booking #${data.data.id} successfully checked in`);
            queryClient.invalidateQueries({ queryKey: ["booking", data.data.id] });
            queryClient.invalidateQueries({
                queryKey: ["bookings"],
                refetchType: "none",
            });
            naviagate("/");
        },
        onError: () => toast.error("The booking could not be check in"),
    });

    return { checkinMutation, isCheckingIn };
}
