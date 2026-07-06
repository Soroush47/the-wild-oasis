import { Outlet } from "react-router-dom";
import Header from "./Header";
import Sidebar from "./Sidebar";
import styled from "styled-components";
import { medias } from "../styles/medias";
import { SidebarProvider } from "../context/SidebarContext";

const StyledAppLayout = styled.div`
    display: grid;
    height: 100vh;
    height: 100dvh;
    /* min-height: 100dvh; */
    grid-template-columns: 26rem 1fr;
    grid-template-rows: auto 1fr;

    ${medias.laptop} {
        grid-template-columns: 1fr;
    }
`;

const Main = styled.main.attrs({
    id: "app-main",
})`
    background-color: var(--color-grey-50);
    padding: 4rem 4.8rem 6.4rem;
    overflow-y: scroll;

    ${medias.laptop} {
        padding: 3rem;
    }
    ${medias.mobile} {
        padding: 2rem;
    }
`;

const Container = styled.div`
    max-width: 120rem;
    /* width: 100%; */
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    gap: 3.2rem;

    ${medias.mobile} {
        gap: 2rem;
    }
`;

function AppLayout() {
    return (
        <StyledAppLayout>
            <SidebarProvider>
                <Header />
                <Sidebar />
                <Main>
                    <Container>
                        <Outlet />
                    </Container>
                </Main>
            </SidebarProvider>
        </StyledAppLayout>
    );
}

export default AppLayout;
