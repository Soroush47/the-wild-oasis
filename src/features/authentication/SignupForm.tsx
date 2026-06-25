import { useSignup } from "./useSignup";
import { useSignupForm } from "./useSignupForm";

import Button from "../../ui/Button";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import { FormData } from "./signupFormSchema";

// Email regex: /\S+@\S+\.\S+/

function SignupForm() {
    const { register, handleSubmit, reset, errors } = useSignupForm();
    const { isSigningUp, signupMutation } = useSignup();

    const onSubmit = (data: FormData) => {
        const { fullName, email, password } = data;
        signupMutation({ fullName, email, password });
    };

    const handleReset = () => reset();

    return (
        <Form onSubmit={handleSubmit(onSubmit)}>
            <FormRow label="Full name" error={errors?.fullName?.message}>
                <Input
                    type="text"
                    id="fullName"
                    {...register("fullName")}
                    disabled={isSigningUp}
                />
            </FormRow>

            <FormRow label="Email address" error={errors?.email?.message}>
                <Input
                    type="email"
                    id="email"
                    {...register("email")}
                    disabled={isSigningUp}
                />
            </FormRow>

            <FormRow
                label="Password (min 8 characters)"
                error={errors?.password?.message}
            >
                <Input
                    type="password"
                    id="password"
                    {...register("password")}
                    disabled={isSigningUp}
                />
            </FormRow>

            <FormRow label="Repeat password" error={errors?.passwordConfirm?.message}>
                <Input
                    type="password"
                    id="passwordConfirm"
                    {...register("passwordConfirm")}
                    disabled={isSigningUp}
                />
            </FormRow>

            <FormRow>
                {/* type is an HTML attribute! */}
                <>
                    <Button
                        $variation="secondary"
                        type="reset"
                        onClick={handleReset}
                        disabled={isSigningUp}
                    >
                        Cancel
                    </Button>
                    <Button disabled={isSigningUp}>Create new user</Button>
                </>
            </FormRow>
        </Form>
    );
}

export default SignupForm;
