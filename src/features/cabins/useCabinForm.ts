import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { CabinFormSchema, FormData } from "./cabinFormSchema";
import { CabinType } from "../../types";

export function useCabinForm(cabin: CabinType | undefined) {
    let formCabin;
    if (cabin) {
        const { createdAt, id, ...rest } = cabin;
        formCabin = rest;
        createdAt && id && null;
    }
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<FormData>({
        resolver: zodResolver(CabinFormSchema),
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

    return { register, handleSubmit, reset, errors };
}
