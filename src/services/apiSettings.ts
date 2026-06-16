import api from "../configs/api";
import { Settings } from "../types";

export async function getSettings() {
    return api.get("/settings");
}

// We expect a newSetting object that looks like {setting: newValue}

// type Setting = keyof Settings;

// type SettingEntry = {
//     [K in Setting]: { [P in K]: Settings[P] };
// }[keyof Settings];

export async function updateSetting(setting: Partial<Settings>) {
    return api.patch("/settings", setting);
}