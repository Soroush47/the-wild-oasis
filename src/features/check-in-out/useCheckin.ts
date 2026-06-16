import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateBooking } from "../../services/apiBookings";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

type Breakfast = null | { hasBreakfast: true; extrasPrice: number; totalPrice: number };

type Obj = {
    isPaid: true;
    status: "checked-in";
    breakfast: Breakfast;
};

const obj = {
    isPaid: true,
    status: "checked-in",
};

interface MutationFnProps {
    id: number;
    breakfast: Breakfast;
}

export function useCheckin() {
    const queryClient = useQueryClient();
    const naviagate = useNavigate();
    const { mutate: checkinMutation, isPending: isCheckingIn } = useMutation({
        mutationFn: ({ id, breakfast = null }: MutationFnProps) =>
            updateBooking<Obj>(id, { ...obj, ...breakfast } as Obj),
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
