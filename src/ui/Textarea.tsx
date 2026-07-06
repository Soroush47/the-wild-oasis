import styled from "styled-components";
import { medias } from "../styles/medias";

const Textarea = styled.textarea`
    padding: 0.8rem 1.2rem;
    border: 1px solid var(--color-grey-300);
    border-radius: 5px;
    background-color: var(--color-grey-0);
    box-shadow: var(--shadow-sm);
    width: 100%;
    height: 8rem;
    min-width: 19.68rem;
    max-width: 23.2rem;
    ${medias.tablet} {
        min-width: 17.92rem;
        padding: 0.6rem 1rem;
    }
`;

export default Textarea;
