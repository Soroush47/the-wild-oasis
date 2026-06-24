import { ReactNode, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Spinner from "./Spinner";
import { useUser } from "../features/authentication/useUser";
import styled from "styled-components";

interface ProtectedRouteProps {
    children: ReactNode;
}

const FullPage = styled.div`
    min-height: 100vh;
    background-color: var(--color-grey-50);
    display: flex;
    align-items: center;
    justify-content: center;
`;

function ProtectedRoute({ children }: ProtectedRouteProps) {
    const navigate = useNavigate();
    const { isLoading, isAuthenticated } = useUser();

    useEffect(() => {
        console.log({ isLoading, isAuthenticated });
        if (!isLoading && !isAuthenticated) {
            navigate("/login");
        }
    }, [navigate, isAuthenticated, isLoading]);

    if (isLoading)
        return (
            <FullPage>
                <Spinner />
            </FullPage>
        );

    if (!isAuthenticated) return null;

    return <>{children}</>;
}

export default ProtectedRoute;
