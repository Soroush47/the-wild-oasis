import styled from "styled-components";
import Logo from "./Logo";
import MainNav from "./MainNav";
import { useSidebar } from "../context/SidebarContext";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import Backdrop from "./Backdrop";
import { medias } from "../styles/medias";
import { useLockBodyScroll } from "../hooks/useLockBodyScroll";
// import Uploader from "../data/Uploader";

interface StyledSidebarProps {
    $isOpen: boolean;
}

const StyledSidebar = styled.aside<StyledSidebarProps>`
    background-color: var(--color-grey-0);
    padding: 3.2rem 2.4rem;
    border-right: 1px solid var(--color-grey-100);
    grid-row: 1/-1;

    display: flex;
    flex-direction: column;
    gap: 3.2rem;

    overflow-y: auto;
    overflow-x: hidden;

    &::-webkit-scrollbar {
        width: 0 !important;
    }
    scrollbar-width: none;
    -ms-overflow-style: none;

    ${medias.laptop} {
        position: fixed;
        top: 0;
        left: 0;

        width: 24rem;
        height: 100dvh;

        z-index: 1000;

        transform: ${({ $isOpen }) => ($isOpen ? "translateX(0)" : "translateX(-100%)")};

        /* transition: transform 0.3s ease; */
        transition: transform 0.4s cubic-bezier(0.22, 1, 0.36, 1);
    }
`;

function Sidebar() {
    const { closeSidebar, isSidebarOpen } = useSidebar();
    const location = useLocation();
    useLockBodyScroll(isSidebarOpen);

    useEffect(() => {
        closeSidebar();
        // console.log("location changed");
    }, [location.pathname, closeSidebar]);

    useEffect(() => {
        function handleKeyDown(e: KeyboardEvent) {
            if (e.key === "Escape") {
                closeSidebar();
            }
        }

        document.addEventListener("keydown", handleKeyDown);

        return () => {
            document.removeEventListener("keydown", handleKeyDown);
        };
    }, [closeSidebar]);

    return (
        <>
            <Backdrop $isOpen={isSidebarOpen} onClick={closeSidebar} />
            <StyledSidebar $isOpen={isSidebarOpen}>
                <Logo />
                <MainNav />
                {/* <Uploader /> */}
            </StyledSidebar>
        </>
    );
}

export default Sidebar;
