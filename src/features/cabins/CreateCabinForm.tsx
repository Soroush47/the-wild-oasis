import { useCreateCabin } from "./useCreateCabin";
import { useUpdateCabin } from "./useUpdateCabin";

import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import FormRow from "../../ui/FormRow";

import { useCabinForm } from "./useCabinForm";
import { FormData } from "./cabinFormSchema";
import { CabinType } from "../../types";

type CreateCabinFormProps = {
    cabin?: CabinType;
    onCloseModal?: () => void;
};

function CreateCabinForm({ cabin, onCloseModal }: CreateCabinFormProps) {
    const { register, handleSubmit, reset, errors } = useCabinForm(cabin);

    const { isCreating, createMutation } = useCreateCabin();
    const { isUpdating, updateMutation } = useUpdateCabin();

    const onSubmit = (data: FormData) => {
        cabin
            ? updateMutation(
                  {
                      ...data,
                      id: cabin.id,
                      image:
                          data.image?.length && typeof data.image !== "string"
                              ? `/src/data/cabins/${data.image.item(0)?.name}`
                              : cabin.image,
                  },
                  { onSuccess: () => onCloseModal?.() },
              )
            : createMutation(data, {
                  onSuccess: () => {
                      reset();
                      onCloseModal?.();
                  },
              });
    };

    return (
        <Form onSubmit={handleSubmit(onSubmit)} type={onCloseModal ? "modal" : "regular"}>
            <FormRow label="Cabin name" error={errors?.name?.message}>
                <Input
                    type="text"
                    id="name"
                    {...register("name")}
                    disabled={cabin ? isUpdating : isCreating}
                />
            </FormRow>

            <FormRow label="Max capacity" error={errors?.maxCapacity?.message}>
                <Input
                    disabled={cabin ? isUpdating : isCreating}
                    type="number"
                    id="maxCapacity"
                    {...register("maxCapacity", { valueAsNumber: true })}
                />
            </FormRow>

            <FormRow label="Regular price" error={errors?.regularPrice?.message}>
                <Input
                    disabled={cabin ? isUpdating : isCreating}
                    type="number"
                    id="regularPrice"
                    {...register("regularPrice", { valueAsNumber: true })}
                />
            </FormRow>

            <FormRow label="Discount" error={errors?.discount?.message}>
                <Input
                    disabled={cabin ? isUpdating : isCreating}
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
                    // type="number"
                    id="description"
                    // defaultValue=""
                    {...register("description")}
                />
            </FormRow>

            <FormRow label="Cabin photo" error={errors?.image?.message}>
                <FileInput
                    disabled={cabin ? isUpdating : isCreating}
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
                    onClick={onCloseModal}
                    type="button"
                    disabled={cabin ? isUpdating : isCreating}
                >
                    Cancel
                </Button>
                <Button disabled={cabin ? isUpdating : isCreating}>
                    {cabin ? "Edit" : "Create new"} cabin
                </Button>
            </FormRow>
        </Form>
    );
}

export default CreateCabinForm;
