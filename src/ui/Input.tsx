import styled, { css } from "styled-components";
import { medias } from "../styles/medias";

interface InputProps {
    $login?: boolean;
}

const Input = styled.input<InputProps>`
    border: 1px solid var(--color-grey-300);
    background-color: var(--color-grey-0);
    border-radius: var(--border-radius-sm);
    padding: 0.8rem 1.2rem;
    box-shadow: var(--shadow-sm);
    ${({ $login }) =>
        !$login &&
        css`
            max-width: 23.2rem;
        `}
    ${medias.tablet} {
        padding: 0.5rem 0.8rem;
    }
`;

export default Input;
