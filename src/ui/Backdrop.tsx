import styled from "styled-components";

interface BackdropProps {
    $isOpen: boolean;
}

const Backdrop = styled.div<BackdropProps>`
    position: fixed;
    inset: 0;

    background-color: var(--backdrop-color);

    z-index: 900;

    opacity: ${({ $isOpen }) => ($isOpen ? 1 : 0)};
    visibility: ${({ $isOpen }) => ($isOpen ? "visible" : "hidden")};

    pointer-events: ${({ $isOpen }) => ($isOpen ? "auto" : "none")};

    transition:
        opacity 0.3s ease,
        visibility 0.3s ease;
`;

export default Backdrop;
