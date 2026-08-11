import { format } from "date-fns";
import api from "../configs/api";
import { uploadImage } from "./apiCloudinary";

export async function getCabins() {
    const res = await api.get("/cabins");
    // console.log(res.data);
    // res.data.map(cabin => console.log({ name: cabin.name, url: cabin.image }));
    return res;
}

export async function deleteCabin(id: number) {
    const res = await api.delete(`/cabins/${id}`);
    // console.log(res.data);
    return res;
}

interface Cabin {
    id?: number;
    createdAt?: string;
    name: string;
    maxCapacity: number;
    regularPrice: number;
    discount: number;
    description: string;
    image?: FileList | string;
}

export async function createCabin(cabin: Cabin) {
    const date = format(new Date(), "yyyy/MM/dd HH:mm:ss"); //HH:24 , hh:12
    cabin.createdAt = date;
    let imageUrl =
        cabin.image ||
        "https://res.cloudinary.com/fz1k9jxz/image/upload/v1786396516/empty2.png";

    if (cabin.image && typeof cabin.image !== "string") {
        const file = cabin.image.item(0);

        if (file) {
            imageUrl = await uploadImage(file);
        }
    }
    const newCabin = {
        ...cabin,
        // image: `/src/data/cabins/${
        //     cabin.image?.length
        //         ? typeof cabin.image !== "string"
        //             ? cabin.image.item(0)?.name
        //             : cabin.image
        //         : "empty2.png"
        // }`,
        image: imageUrl,
    };
    const res = await api.post("/cabins", newCabin);
    console.log(res.data);
    return res;
}

export async function updateCabin(cabin: Cabin) {
    let imageUrl = cabin.image;

    if (cabin.image && typeof cabin.image !== "string") {
        const file = cabin.image.item(0);

        if (file) {
            imageUrl = await uploadImage(file);
        }
    }

    const updatedCabin = {
        ...cabin,
        image: imageUrl,
    };
    const res = await api.patch(`/cabins/${cabin.id}`, updatedCabin);
    console.log(res.data);
    return res;
}
