import styled from "styled-components";
import LoginForm from "../features/authentication/LoginForm";
import Logo from "../ui/Logo";
import Heading from "../ui/Heading";
import { medias } from "../styles/medias";

const LoginLayout = styled.main`
    min-height: 100vh;
    min-height: 100dvh;
    display: grid;
    grid-template-columns: minmax(24rem, 48rem);
    justify-content: center;
    gap: 4rem;
    align-content: flex-start;
    background-color: var(--color-grey-50);
    padding: 4rem 10rem;
    ${medias.mobile}{
        padding: 4rem 6rem

    };
`;

function Login() {
    return (
        <LoginLayout>
            <Logo />
            <Heading as="h4">Log in to your account</Heading>
            <LoginForm />
        </LoginLayout>
    );
}

export default Login;
