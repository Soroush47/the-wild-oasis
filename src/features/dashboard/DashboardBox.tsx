import styled from "styled-components";
import { medias } from "../../styles/medias";

const DashboardBox = styled.div`
    /* Box */
    background-color: var(--color-grey-0);
    border: 1px solid var(--color-grey-100);
    border-radius: var(--border-radius-md);

    padding: var(--space-6);

    display: flex;
    flex-direction: column;
    gap: var(--space-5);

    ${medias.mobile} {
        padding: 2rem;
        gap: var(--space-4);
    }
`;

export default DashboardBox;
