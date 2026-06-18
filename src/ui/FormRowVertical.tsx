import styled from "styled-components";
import { ReactElement } from "react";

const StyledFormRowVertical = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.8rem;
    padding: 1.2rem 0;
`;

const Label = styled.label`
    font-weight: 500;
`;

const Error = styled.span`
    font-size: 1.4rem;
    color: var(--color-red-700);
`;

interface FormRowVerticalProps {
    error?: string;
    label?: string;
    children: ReactElement & { props?: { id?: string } };
}

function FormRowVertical({ error = "", label = "", children }: FormRowVerticalProps) {
    return (
        <StyledFormRowVertical>
            {label && <Label htmlFor={children.props.id}>{label}</Label>}
            {children}
            {error && <Error>{error}</Error>}
        </StyledFormRowVertical>
    );
}

export default FormRowVertical;
