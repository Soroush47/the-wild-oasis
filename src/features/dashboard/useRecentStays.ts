import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import { getStaysAfterDate } from "../../services/apiBookings";
import { subDays } from "date-fns";
import { BookingType } from "../../types";

export function useRecentStays() {
    const [searchParams] = useSearchParams();
    const numDays = !searchParams.get("last") ? 7 : Number(searchParams.get("last"));

    const queryDate = subDays(new Date(), numDays);
    queryDate.setUTCHours(0, 0, 0, 0);

    const { data, isLoading } = useQuery({
        queryKey: ["stays", `last-${numDays}`],
        queryFn: () => getStaysAfterDate(queryDate),
        retry: false,
    });

    const stays = data?.data;

    const confirmedStays = stays?.filter(
        (stay: BookingType) =>
            stay.status === "checked-in" || stay.status === "checked-out",
    );

    return { stays, confirmedStays, isLoading };
}
