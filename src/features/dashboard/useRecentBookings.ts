import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import { getBookingsAfterDate } from "../../services/apiBookings";
import { subDays } from "date-fns";

export function useRecentBookings() {
    const [searchParams] = useSearchParams();
    const numDays = !searchParams.get("last") ? 7 : Number(searchParams.get("last"));

    const queryDate = subDays(new Date(), numDays);
    queryDate.setUTCHours(0, 0, 0, 0);
    const { data, isLoading } = useQuery({
        queryKey: ["bookings", `last-${numDays}`],
        queryFn: () => getBookingsAfterDate(queryDate),
        retry: false,
    });

    const bookings = data?.data;
    return { bookings, isLoading };
}
