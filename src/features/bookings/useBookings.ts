import { useQuery } from "@tanstack/react-query";
import { getBookings } from "../../services/apiBookings";

export function useBookings() {
    const { data, isLoading } = useQuery({
        queryKey: ["bookings"],
        queryFn: getBookings,
    });

    return { data, isLoading };
}
