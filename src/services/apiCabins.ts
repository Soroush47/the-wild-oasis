// import supabase from "./supabase";

import api from "../configs/api";

export async function getCabins() {
    // const { data, error } = await supabase.from("cabins").select("*");
    // if (error) {
    //     console.error(error);
    //     throw new Error("Cabins could not be loaded");
    // }

    // return data;

    return api.get("/cabins");
}
