import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getBookings } from "../../services/apiBookings";
import { useSearchParams } from "react-router-dom";
import { PAGE_SIZE } from "../../utils/constants";

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
    const queryClient = useQueryClient();
    const [searchParams] = useSearchParams();

    const filterValue = (searchParams.get("status") || "all") as FilterValue;
    const filter: Filter = { field: "status", value: filterValue };

    const sortBy = (searchParams.get("sortBy") || "createdAt-asc") as SortBy;

    const page = Number(searchParams.get("page")) || 1;

    const { data, isLoading } = useQuery({
        queryKey: ["bookings", filter, sortBy, page],
        queryFn: () => getBookings(filter, sortBy, page),
    });

    const pageCount = Math.ceil(data?.data.count / PAGE_SIZE);

    if (page < pageCount)
        queryClient.prefetchQuery({
            queryKey: ["bookings", filter, sortBy, page + 1],
            queryFn: () => getBookings(filter, sortBy, page + 1),
        });

    if (page > 1)
        queryClient.prefetchQuery({
            queryKey: ["bookings", filter, sortBy, page - 1],
            queryFn: () => getBookings(filter, sortBy, page - 1),
        });

    return { data, isLoading };
}
