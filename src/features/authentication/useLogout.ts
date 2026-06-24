import { useMutation, useQueryClient } from "@tanstack/react-query";
import { logout } from "../../services/apiAuth";
import { useNavigate } from "react-router-dom";

export function useLogout() {
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    const { mutate: logoutMutation, isPending } = useMutation({
        mutationFn: logout,
        onSuccess: () => {
            queryClient.removeQueries();
            navigate("/login", { replace: true });
        },
    });

    return { logoutMutation, isPending };
}
