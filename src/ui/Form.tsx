import styled, { css } from "styled-components";
import { medias } from "../styles/medias";

interface FormProps {
    type?: "modal" | "regular";
}

const Form = styled.form<FormProps>`
    overflow-x: hidden;
    font-size: 1.4rem;
    &::-webkit-scrollbar {
        width: 0 !important;
    }
    scrollbar-width: none;
    -ms-overflow-style: none;
    ${props =>
        props.type === "regular" &&
        css`
            width: 100%;

            padding: 2.4rem 4rem;

            /* Box */
            background-color: var(--color-grey-0);
            border: 1px solid var(--color-grey-100);
            border-radius: var(--border-radius-md);
        `}

    ${props =>
        props.type === "modal" &&
        css`
            max-height: 80vh;
            max-width: 80rem;
            width: 80vw;
            ${medias.laptop} {
                width: 73vw;
            }
            ${medias.mobile} {
                padding: 0rem 1rem;
            }
        `}
    

    ${medias.tablet} {
        font-size: 1.3rem;
    }
`;

Form.defaultProps = {
    type: "regular",
};

export default Form;
