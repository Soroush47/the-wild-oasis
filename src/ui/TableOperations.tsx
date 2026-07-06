import styled from "styled-components";
import { medias } from "../styles/medias";

const TableOperations = styled.div`
    display: flex;
    align-items: center;
    gap: var(--space-4);

    ${medias.desktop} {
        /* flex-direction: column; */
        /* align-items: end; */
        justify-content: end;
        /* justify-content: space-between; */
    }
    ${medias.tablet} {
        flex-direction: column;
        align-items: end;
    }
    ${medias.mobile} {
        gap: var(--space-3);
    }
`;

export default TableOperations;
