import { ChangeEvent } from "react";
import styled from "styled-components";

interface StyledSelectProps {
    type?: string;
}

const StyledSelect = styled.select<StyledSelectProps>`
    font-size: 1.4rem;
    padding: 0.8rem 1.2rem;
    border: 1px solid
        ${props =>
            props.type === "white" ? "var(--color-grey-100)" : "var(--color-grey-300)"};
    border-radius: var(--border-radius-sm);
    background-color: var(--color-grey-0);
    font-weight: 500;
    box-shadow: var(--shadow-sm);
    cursor: pointer;
`;

type Option = {
    value: string;
    label: string;
};

interface SelectProps {
    type?: string;
    onChange: (event: ChangeEvent<HTMLSelectElement>) => void;
    options: Option[];
    value: string;
}

function Select({ options, ...rest }: SelectProps) {
    // console.log(rest);
    return (
        <StyledSelect {...rest}>
            <option value="createdAt-asc">-</option>
            {options.map(({ value, label }) => (
                <option key={value} value={value}>
                    {label}
                </option>
            ))}
        </StyledSelect>
    );
}

export default Select;
