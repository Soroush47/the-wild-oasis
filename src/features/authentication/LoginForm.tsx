import { FormEvent, useState } from "react";
import Button from "../../ui/Button";
import Form from "../../ui/Form";
import Input from "../../ui/Input";
import FormRowVertical from "../../ui/FormRowVertical";
import { useLogin } from "./useLogin";
import SpinnerMini from "../../ui/SpinnerMini";

function LoginForm() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { isLogingIn, loginMutation } = useLogin();

    function handleSubmit(e: FormEvent) {
        e.preventDefault();
        console.log({ email, password });
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

    return (
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
                />
            </FormRowVertical>
            <FormRowVertical label="Password">
                <Input
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
    );
}

export default LoginForm;
