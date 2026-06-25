import { FormEvent, useState } from "react";

import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";

import { useUser } from "./useUser";
import { useUpdateUser } from "./useUpdateUser";

function UpdateUserDataForm() {
    const {
        user: { id, email, fullName: currentFullName, avatar: currentAvatar },
    } = useUser();
    const { updateUserMutation, isUpdating } = useUpdateUser();

    const [fullName, setFullName] = useState(currentFullName);
    const [avatar, setAvatar] = useState<File | null | string>(null);

    function handleReset() {
        setFullName(currentFullName);
        setAvatar(null);
    }

    function handleSubmit(e: FormEvent) {
        e.preventDefault();

        const hasChanged = fullName !== currentFullName || avatar !== currentAvatar;

        if (!hasChanged) return;

        updateUserMutation(
            { id, fullName, avatar },
            {
                onError: () => handleReset(),
                onSuccess: () => {
                    setAvatar(null);
                    (e.target as HTMLFormElement).reset();
                },
            },
        );
        console.log({ id, fullName, avatar });
    }

    console.log(avatar);

    return (
        <Form onSubmit={handleSubmit}>
            <FormRow label="Email address">
                <Input value={email} disabled />
            </FormRow>
            <FormRow label="Full name">
                <Input
                    type="text"
                    value={fullName}
                    onChange={e => setFullName(e.target.value)}
                    id="fullName"
                    disabled={isUpdating}
                />
            </FormRow>
            <FormRow label="Avatar image">
                <FileInput
                    id="avatar"
                    accept="image/*"
                    onChange={e => setAvatar(e?.target?.files?.[0] ?? null)}
                    disabled={isUpdating}
                />
            </FormRow>
            <FormRow>
                <>
                    <Button
                        type="reset"
                        $variation="secondary"
                        disabled={isUpdating}
                        onClick={handleReset}
                    >
                        Cancel
                    </Button>
                    <Button disabled={isUpdating}>Update account</Button>
                </>
            </FormRow>
        </Form>
    );
}

export default UpdateUserDataForm;
