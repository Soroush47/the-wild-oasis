// import supabase from "./supabase";

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
