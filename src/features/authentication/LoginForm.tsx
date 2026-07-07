import { FormEvent, useState } from "react";
import Button from "../../ui/Button";
import Form from "../../ui/Form";
import Input from "../../ui/Input";
import FormRowVertical from "../../ui/FormRowVertical";
import { useLogin } from "./useLogin";
import SpinnerMini from "../../ui/SpinnerMini";
import ButtonText from "../../ui/ButtonText";

const DEMO_EMAIL = "demo@example.com";
const DEMO_PASSWORD = "11112222";

function LoginForm() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { isLogingIn, loginMutation } = useLogin();

    function handleSubmit(e: FormEvent) {
        e.preventDefault();
        // console.log({ email, password });
        if (!email || !password) return;
        loginMutation(
            { email, password },
            {
                onSettled: () => {
                    setEmail("");
                    setPassword("");
                },
            },
        );
    }

    const handleDemo = () => {
        setEmail(DEMO_EMAIL);
        setPassword(DEMO_PASSWORD);
    };

    return (
        <>
            <Form onSubmit={handleSubmit}>
                <FormRowVertical label="Email address">
                    <Input
                        type="email"
                        id="email"
                        // This makes this form better for password managers
                        autoComplete="username"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        disabled={isLogingIn}
                        $login
                    />
                </FormRowVertical>
                <FormRowVertical label="Password">
                    <Input
                        $login
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        disabled={isLogingIn}
                    />
                </FormRowVertical>
                <FormRowVertical>
                    <Button size="large" disabled={isLogingIn}>
                        {!isLogingIn ? "Log in" : <SpinnerMini />}
                    </Button>
                </FormRowVertical>
            </Form>
            <ButtonText onClick={handleDemo}>Demo account</ButtonText>
        </>
    );
}

export default LoginForm;
