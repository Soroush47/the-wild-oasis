import { useQuery } from "@tanstack/react-query";
import { getCabins } from "../../services/apiCabins";

export function useCabins() {
    const { data, isLoading } = useQuery({
        queryKey: ["cabins"],
        queryFn: getCabins,
    });

    return { data, isLoading };
}
