import styled from "styled-components";

interface StyledCheckbox {
    $disabled?: boolean;
}

const StyledCheckbox = styled.div<StyledCheckbox>`
    display: flex;
    gap: 1.6rem;

    & input[type="checkbox"] {
        height: 2.4rem;
        width: 2.4rem;
        outline-offset: 2px;
        transform-origin: 0;
        accent-color: var(--color-brand-600);
        cursor: pointer;
    }

    & input[type="checkbox"]:disabled {
        accent-color: var(--color-brand-600);
        cursor: default;
    }

    & label {
        flex: 1;
        display: flex;
        align-items: center;
        gap: 0.8rem;
        cursor: ${props => (props.$disabled ? "default" : "pointer")};
    }
`;

interface CheckboxProps {
    checked: boolean;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    disabled?: boolean;
    id: string;
    children: React.ReactNode;
}

function Checkbox({ checked, onChange, disabled = false, id, children }: CheckboxProps) {
    return (
        <StyledCheckbox $disabled={disabled}>
            <input
                type="checkbox"
                id={id}
                checked={checked}
                onChange={onChange}
                disabled={disabled}
            />
            <label htmlFor={!disabled ? id : ""}>{children}</label>
        </StyledCheckbox>
    );
}

export default Checkbox;
