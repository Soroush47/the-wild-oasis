// import supabase from "./supabase";

import { format } from "date-fns";
import api from "../configs/api";

export async function getCabins() {
    // const { data, error } = await supabase.from("cabins").select("*");
    // if (error) {
    //     console.error(`Supabase error: ${error}`);
    //     throw new Error("Cabins could not be loaded");
    // }

    // return data;

    return api.get("/cabins");
}

export async function deleteCabin(id: number) {
    return api.delete(`/cabins/${id}`);
}

interface Cabin {
    createdAt?: string;
    name: string;
    maxCapacity: number;
    regularPrice: number;
    discount: number;
    description: string;
    image: string;
}

export async function createCabin(cabin: Cabin) {
    const date = format(new Date(), "yy/mm/dd HH:mm:ss"); //HH:24 , hh:12
    cabin.createdAt = date;
    return api.post("/cabins", cabin);
}
