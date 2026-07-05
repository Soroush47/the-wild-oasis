import styled, { css } from "styled-components";
import { medias } from "../styles/medias";

interface RowProps {
    type?: "horizontal" | "vertical";
    responsive?: boolean;
}

const Row = styled.div<RowProps>`
    display: flex;

    ${props =>
        props.type === "horizontal" &&
        css`
            justify-content: space-between;
            align-items: center;
        `}
    ${props =>
        props.type === "vertical" &&
        css`
            flex-direction: column;
            gap: var(--space-4);
        `}
    ${({ responsive }) =>
        responsive &&
        css`
            ${medias.desktop} {
                flex-direction: column;
                align-items: stretch;
                gap: var(--space-4);
            }
        `}
`;

Row.defaultProps = {
    type: "vertical",
};

export default Row;
