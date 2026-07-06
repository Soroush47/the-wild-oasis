import styled from "styled-components";
import { ReactElement } from "react";
import { medias } from "../styles/medias";

const StyledFormRow = styled.div`
    display: grid;
    align-items: center;
    grid-template-columns: 24rem 1fr 1.2fr;
    gap: 2.4rem;

    padding: 1.2rem 0;

    &:first-child {
        padding-top: 1.5rem;
    }

    &:last-child {
        padding-bottom: 0;
    }

    &:not(:last-child) {
        border-bottom: 1px solid var(--color-grey-100);
    }

    &:has(button) {
        display: flex;
        justify-content: flex-end;
        gap: 1.2rem;
    }

    ${medias.laptop} {
        grid-template-columns: 24rem 0.4fr;
        /* padding-right: 2.4rem; */
        gap: 0.6rem;
    }
    ${medias.tablet} {
        grid-template-columns: 20rem 0.4fr;
    }
    ${medias.mobile} {
        grid-template-columns: 1fr;
    }
`;

const Label = styled.label`
    font-weight: 500;
`;

const Error = styled.span`
    font-size: 1.4rem;
    color: var(--color-red-700);
    ${medias.laptop} {
        font-size: 1.2rem;
    }
`;

interface FormRowProps {
    error?: string;
    label?: string;
    children: ReactElement & { props?: { id?: string } };
}

function FormRow({ error = "", label = "", children }: FormRowProps) {
    return (
        <StyledFormRow>
            {label && <Label htmlFor={children?.props?.id}>{label}</Label>}
            {children}
            {error && <Error>{error}</Error>}
        </StyledFormRow>
    );
}

export default FormRow;
