import api from "../configs/api";
// import supabase from "./supabase";

export async function getSettings() {
    // const { data, error } = await supabase.from("settings").select("*").single();

    // if (error) {
    //   console.error(error);
    //   throw new Error("Settings could not be loaded");
    // }
    // return data;
    return api.get("/settings");
}

// We expect a newSetting object that looks like {setting: newValue}

interface Settings {
    minBookingLength: number;
    maxBookingLength: number;
    maxGuestsPerBooking: number;
    breakfastPrice: number;
}
// type Setting = keyof Settings;

// type SettingEntry = {
//     [K in Setting]: { [P in K]: Settings[P] };
// }[keyof Settings];

export async function updateSetting(setting: Partial<Settings>) {
    // const { data, error } = await supabase
    //     .from("settings")
    //     .update(newSetting)
    //     // There is only ONE row of settings, and it has the ID=1, and so this is the updated one
    //     .eq("id", 1)
    //     .single();

    // if (error) {
    //     console.error(error);
    //     throw new Error("Settings could not be updated");
    // }
    // return data;
    return api.patch("/settings", setting);
}
