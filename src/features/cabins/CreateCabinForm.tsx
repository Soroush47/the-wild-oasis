import { useForm } from "react-hook-form";
import z from "zod";

import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import { createCabin, editCabin } from "../../services/apiCabins";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import FormRow from "../../ui/FormRow";
import React from "react";

// interface Cabin {
//     name: string;
//     maxCapacity: number;
//     regularPrice: number;
//     discount: number;
//     description: string;
//     image: string;
// }

const createCabinFormSchema = z
    .object({
        name: z.string().trim().min(1, "Name is required"),
        maxCapacity: z
            .number({ error: "Capacity should be at least 1" })
            .min(1, "Capacity should be at least 1"),
        regularPrice: z
            .number({ error: "Regular price should be at least 1$" })
            .min(1, "Regular price should be at least 1$"),
        discount: z.number().min(0),
        description: z.string().trim().min(1, "Description is required"),
        image: z
            .instanceof(FileList)
            .refine(() => 1 <= 2_000_000, "Max size is 2MB")
            .optional()
            .or(z.string()),
    })
    .superRefine((data, ctx) => {
        if (data.discount >= data.regularPrice) {
            ctx.addIssue({
                code: "custom",
                message: "Discount should be less than regular price",
                path: ["discount"],
            });
        }
    });

export type FormData = z.infer<typeof createCabinFormSchema>;

type CabinType = {
    id: number;
    createdAt: Date;
    name: string;
    maxCapacity: number;
    regularPrice: number;
    discount: number;
    description: string;
    image: string;
};

type CreateCabinFormProps = {
    cabin?: CabinType;
    setShowForm?: React.Dispatch<React.SetStateAction<boolean>>;
};

function CreateCabinForm({ cabin, setShowForm }: CreateCabinFormProps) {
    let formCabin;
    if (cabin) {
        const { createdAt, id, ...rest } = cabin;
        formCabin = rest;
        createdAt && id && null;
    }
    // console.log(formCabin);
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<FormData>({
        resolver: zodResolver(createCabinFormSchema),
        defaultValues: cabin
            ? { ...formCabin }
            : {
                  name: "",
                  maxCapacity: undefined,
                  regularPrice: undefined,
                  discount: 0,
                  description: "",
                  image: undefined,
              },
    });
    const queryClient = useQueryClient();
    const { mutate, isPending: isCreating } = useMutation({
        mutationFn: createCabin,
        onSuccess: () => {
            toast.success("New cabin created successfully");
            queryClient.invalidateQueries({
                queryKey: ["cabins"],
            });
            reset();
        },
        onError: () => toast.error("Cabin could not be created"),
    });

    const { mutate: editMutate, isPending: isEditing } = useMutation({
        mutationFn: editCabin,
        onSuccess: () => {
            toast.success("The cabin edited succesfully");
            queryClient.invalidateQueries({
                queryKey: ["cabins"],
            });
            setShowForm?.(show => !show);
        },
        onError: () => toast.error("The cabin could not be edited"),
    });

    const onSubmit = (data: FormData) => {
        // console.log(data);
        // console.log(cabin);
        cabin
            ? editMutate({
                  ...data,
                  id: cabin.id,
                  image:
                      data.image?.length && typeof data.image !== "string"
                          ? `/src/data/cabins/${data.image.item(0)?.name}`
                          : cabin.image,
              })
            : mutate(data);
    };

    // console.log({ isCreating, errors });

    return (
        <Form onSubmit={handleSubmit(onSubmit)}>
            <FormRow label="Cabin name" error={errors?.name?.message}>
                <Input
                    type="text"
                    id="name"
                    {...register("name")}
                    disabled={cabin ? isEditing : isCreating}
                />
            </FormRow>

            <FormRow label="Max capacity" error={errors?.maxCapacity?.message}>
                <Input
                    disabled={cabin ? isEditing : isCreating}
                    type="number"
                    id="maxCapacity"
                    {...register("maxCapacity", { valueAsNumber: true })}
                />
            </FormRow>

            <FormRow label="Regular price" error={errors?.regularPrice?.message}>
                <Input
                    disabled={cabin ? isEditing : isCreating}
                    type="number"
                    id="regularPrice"
                    {...register("regularPrice", { valueAsNumber: true })}
                />
            </FormRow>

            <FormRow label="Discount" error={errors?.discount?.message}>
                <Input
                    disabled={cabin ? isEditing : isCreating}
                    type="number"
                    id="discount"
                    // defaultValue={0}
                    {...register("discount", {
                        setValueAs: value => (value === "" ? 0 : value),
                        valueAsNumber: true,
                    })}
                />
            </FormRow>

            <FormRow label="Description for website" error={errors?.description?.message}>
                <Textarea
                    disabled={cabin ? isEditing : isCreating}
                    // type="number"
                    id="description"
                    // defaultValue=""
                    {...register("description")}
                />
            </FormRow>

            <FormRow label="Cabin photo" error={errors?.image?.message}>
                <FileInput
                    disabled={cabin ? isEditing : isCreating}
                    id="image"
                    accept="image/*"
                    {...register("image")}
                    // defaultValue="/src/data/cabins/cabin-001.jpg"
                />
            </FormRow>

            <FormRow>
                {/* type is an HTML attribute! */}
                <Button
                    $variation="secondary"
                    onClick={() => reset()}
                    type="button"
                    disabled={cabin ? isEditing : isCreating}
                >
                    Cancel
                </Button>
                <Button disabled={cabin ? isEditing : isCreating}>
                    {cabin ? "Edit" : "Create new"} cabin
                </Button>
            </FormRow>
        </Form>
    );
}

export default CreateCabinForm;
