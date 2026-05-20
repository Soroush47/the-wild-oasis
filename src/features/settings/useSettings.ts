import { useQuery } from "@tanstack/react-query";
import { getSettings } from "../../services/apiSettings";

export function useSettings() {
    const { isLoading, data } = useQuery({
        queryKey: ["settings"],
        queryFn: getSettings,
    });
    console.log({ isLoading });

    const settings = data?.data;

    return { isLoading, settings };
}
