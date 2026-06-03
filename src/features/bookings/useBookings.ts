import { useQuery } from "@tanstack/react-query";
import { getBookings } from "../../services/apiBookings";
import { useSearchParams } from "react-router-dom";

type FilterValue = "unconfirmed" | "checked-in" | "checked-out" | "all";

interface Filter {
    field: "status";
    value: FilterValue;
}

type SortBy =
    | "startDate-asc"
    | "startDate-desc"
    | "totalPrice-asc"
    | "totalPrice-desc"
    | "createdAt-asc";

export function useBookings() {
    const [searchParams] = useSearchParams();

    const filterValue = (searchParams.get("status") || "all") as FilterValue;
    const filter: Filter = { field: "status", value: filterValue };
    const sortBy = (searchParams.get("sortBy") || "createdAt-asc") as SortBy;
    const { data, isLoading } = useQuery({
        queryKey: ["bookings", filter, sortBy],
        queryFn: () => getBookings(filter, sortBy),
    });

    return { data, isLoading };
}
