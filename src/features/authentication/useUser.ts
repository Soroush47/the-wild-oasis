import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";

import { getMe } from "../../services/apiAuth";

export function useUser() {
    const { data, isLoading, isError, error } = useQuery({
        queryKey: ["user"],
        queryFn: getMe,
        retry: false,
    });

    useEffect(() => {
        if (isError) {
            localStorage.removeItem("auth_data");
            localStorage.removeItem("user");
        }
    }, [isError]);

    return { user: data?.user, isLoading, error, isAuthenticated: !!data?.user };
}
