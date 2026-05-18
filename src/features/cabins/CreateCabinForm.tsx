import { useForm } from "react-hook-form";
import styled from "styled-components";

import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import { createCabin } from "../../services/apiCabins";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

const FormRow = styled.div`
    display: grid;
    align-items: center;
    grid-template-columns: 24rem 1fr 1.2fr;
    gap: 2.4rem;

    padding: 1.2rem 0;

    &:first-child {
        padding-top: 0;
    }

    &:last-child {
        padding-bottom: 0;
    }

    &:not(:last-child) {
        border-bottom: 1px solid var(--color-grey-100);
    }

    &:has(button) {
        display: flex;
        justify-content: flex-end;
        gap: 1.2rem;
    }
`;

const Label = styled.label`
    font-weight: 500;
`;

// const Error = styled.span`
//   font-size: 1.4rem;
//   color: var(--color-red-700);
// `;

interface Cabin {
    name: string;
    maxCapacity: number;
    regularPrice: number;
    discount: number;
    description: string;
    image: string;
}

function CreateCabinForm() {
    const { register, handleSubmit, reset } = useForm({
        defaultValues: {
            name: "",
            maxCapacity: null,
            regularPrice: null,
            discount: 0,
            description: "",
            image: "/src/data/cabins/cabin-001.jpg",
        },
    });
    const queryClient = useQueryClient();
    const { mutate, isPending } = useMutation({
        mutationFn: (cabin: Cabin) => createCabin(cabin),
        onSuccess: () => {
            toast.success("Cabin added successfully");
            queryClient.invalidateQueries({
                queryKey: ["cabins"],
            });
        },
        onError: () => toast.error("Cabin could not add"),
    });

    const onSubmit = data => {
        // console.log(data)
        mutate(data);
    };

    console.log({ isPending });

    return (
        <Form onSubmit={handleSubmit(onSubmit)}>
            <FormRow>
                <Label htmlFor="name">Cabin name</Label>
                <Input type="text" id="name" {...register("name")} />
            </FormRow>

            <FormRow>
                <Label htmlFor="maxCapacity">Maximum capacity</Label>
                <Input type="number" id="maxCapacity" {...register("maxCapacity")} />
            </FormRow>

            <FormRow>
                <Label htmlFor="regularPrice">Regular price</Label>
                <Input type="number" id="regularPrice" {...register("regularPrice")} />
            </FormRow>

            <FormRow>
                <Label htmlFor="discount">Discount</Label>
                <Input
                    type="number"
                    id="discount"
                    // defaultValue={0}
                    {...register("discount")}
                />
            </FormRow>

            <FormRow>
                <Label htmlFor="description">Description for website</Label>
                <Textarea
                    type="number"
                    id="description"
                    // defaultValue=""
                    {...register("description")}
                />
            </FormRow>

            <FormRow>
                <Label htmlFor="image">Cabin photo</Label>
                <FileInput
                    id="image"
                    accept="image/*"
                    {...register("image")}
                    // defaultValue="/src/data/cabins/cabin-001.jpg"
                />
            </FormRow>

            <FormRow>
                {/* type is an HTML attribute! */}
                <Button variation="secondary" onClick={() => reset()} type="button">
                    Cancel
                </Button>
                <Button>Add cabin</Button>
            </FormRow>
        </Form>
    );
}

export default CreateCabinForm;
