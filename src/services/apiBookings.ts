import api from "../configs/api";
import { getToday } from "../utils/helpers";
import supabase from "./supabase";
import { PAGE_SIZE } from "../utils/constants";

type Filter = {
    field: "status";
    value: "unconfirmed" | "checked-in" | "checked-out" | "all";
};

type SortBy =
    | "startDate-asc"
    | "startDate-desc"
    | "totalPrice-asc"
    | "totalPrice-desc"
    | "createdAt-asc";

export async function getBookings(filter: Filter, sortBy: SortBy, page: number) {
    let url = "/bookings";

    url += `?page=${page}&limit=${PAGE_SIZE || 10}&`;
    if (filter.value !== "all") url += `${filter.field}=${filter.value}&`;
    if (sortBy !== "createdAt-asc") url += `sortBy=${sortBy}`;

    const res = await api.get(url);
    console.log(res.data);
    return res;
}

export async function getBooking(id: number) {
    const res = await api.get(`/bookings/${id}`);

    return res;
}

// Returns all BOOKINGS that are were created after the given date. Useful to get bookings created in the last 30 days, for example.
export async function getBookingsAfterDate(date) {
    const { data, error } = await supabase
        .from("bookings")
        .select("created_at, totalPrice, extrasPrice")
        .gte("created_at", date)
        .lte("created_at", getToday({ end: true }));

    if (error) {
        console.error(error);
        throw new Error("Bookings could not get loaded");
    }

    return data;
}

// Returns all STAYS that are were created after the given date
export async function getStaysAfterDate(date) {
    const { data, error } = await supabase
        .from("bookings")
        // .select('*')
        .select("*, guests(fullName)")
        .gte("startDate", date)
        .lte("startDate", getToday());

    if (error) {
        console.error(error);
        throw new Error("Bookings could not get loaded");
    }

    return data;
}

// Activity means that there is a check in or a check out today
export async function getStaysTodayActivity() {
    const { data, error } = await supabase
        .from("bookings")
        .select("*, guests(fullName, nationality, countryFlag)")
        .or(
            `and(status.eq.unconfirmed,startDate.eq.${getToday()}),and(status.eq.checked-in,endDate.eq.${getToday()})`,
        )
        .order("created_at");

    // Equivalent to this. But by querying this, we only download the data we actually need, otherwise we would need ALL bookings ever created
    // (stay.status === 'unconfirmed' && isToday(new Date(stay.startDate))) ||
    // (stay.status === 'checked-in' && isToday(new Date(stay.endDate)))

    if (error) {
        console.error(error);
        throw new Error("Bookings could not get loaded");
    }
    return data;
}

export async function updateBooking<T>(id: number, obj?: T) {
    const res = await api.patch(`/bookings/${id}`, obj);
    console.log(res.data);
    return res;
}

export async function deleteBooking(id: number) {
    const res = await api.delete(`/bookings/${id}`);

    return res;
}
