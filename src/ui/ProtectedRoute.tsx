import { ReactNode, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Spinner from "./Spinner";
import { useUser } from "../features/authentication/useUser";

interface ProtectedRouteProps {
    children: ReactNode;
}

function ProtectedRoute({ children }: ProtectedRouteProps) {
    const navigate = useNavigate();
    const { isLoading, isAuthenticated } = useUser();

    useEffect(() => {
        if (!isLoading && !isAuthenticated) {
            navigate("/login");
        }
    }, [navigate, isAuthenticated, isLoading]);

    if (isLoading) return <Spinner />;

    if (!isAuthenticated) return null;

    return <>{children}</>;
}

export default ProtectedRoute;
