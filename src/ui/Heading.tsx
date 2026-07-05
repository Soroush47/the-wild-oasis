import styled, { css } from "styled-components";

const Heading = styled.h1`
    font-weight: 600;

    ${props =>
        (!props.as || props.as === "h1") &&
        css`
            font-size: 3rem;
        `}
    ${props =>
        props.as === "h2" &&
        css`
            font-size: 2.4rem;
        `}
    ${props =>
        props.as === "h3" &&
        css`
            font-size: 2rem;
            font-weight: 500;
        `}
    ${props =>
        props.as === "h4" &&
        css`
            font-size: 1.6rem;
            font-weight: 500;
            text-align: center;
        `}
`;

// Heading.defaultProps = {
//     as: "h1",
// };

export default Heading;
