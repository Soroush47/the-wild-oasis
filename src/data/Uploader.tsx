import { useState } from "react";
// import { isFuture, isPast, isToday } from "date-fns";
import Button from "../ui/Button";
// import { subtractDates } from "../utils/helpers";

import { bookings } from "./data-bookings";
import { cabins } from "./data-cabins";
import { guests } from "./data-guests";
import api from "../configs/api";
import { subtractDates } from "../utils/helpers";
import { isFuture, isPast, isToday } from "date-fns";

// const originalSettings = {
//   minBookingLength: 3,
//   maxBookingLength: 30,
//   maxGuestsPerBooking: 10,
//   breakfastPrice: 15,
// };

// DELETE all data
async function deleteGuests() {
    try {
        const res = await api.delete("/guests/delete-all");
        console.log(res.data?.message);
    } catch (error) {
        console.log("Error deleting all guests: ", error);
    }
}
async function deleteCabins() {
    try {
        const res = await api.delete("/cabins/delete-all");
        console.log(res.data?.message);
    } catch (error) {
        console.log("Error deleting all cabins: ", error);
    }
}
async function deleteBookings() {
    try {
        const res = await api.delete("/bookings/delete-all");
        console.log(res.data?.message);
    } catch (error) {
        console.log("Error deleting all bookings: ", error);
    }
}

// // POST many data
async function createGuests() {
    try {
        // guests
        //     .map((guest, index) => {
        //         console.log({ id: index, email: guest.email });
        //         return guest.email;
        //     })
        //     .sort();
        // console.log({ emails });
        const res = await api.post("/guests/create-many", guests);
        console.log(res.data?.message);
    } catch (error) {
        console.log("Error creating many guests: ", error);
    }
}

async function createCabins() {
    try {
        const res = await api.post("/cabins/create-many", cabins);
        console.log(res.data?.message);
    } catch (error) {
        console.log("Error creating many cabins: ", error);
    }
}

async function createBookings() {
    // Bookings need a guestId and a cabinId. We can't tell Supabase IDs for each object, it will calculate them on its own. So it might be different for different people, especially after multiple uploads. Therefore, we need to first get all guestIds and cabinIds, and then replace the original IDs in the booking data with the actual ones from the DB
    const {
        data: [guestsIds, cabinsIds],
    } = await api.get("/cabinIds-guestIds");
    const allGuestIds = guestsIds?.map((guest: { id: number }) => guest.id);
    const allCabinIds = cabinsIds?.map((cabin: { id: number }) => cabin.id);
    console.log("guestsIds ", allGuestIds);
    console.log("cabinIds ", allCabinIds);
    const finalBookings = bookings.map(booking => {
        // Here relying on the order of cabins, as they don't have and ID yet
        const cabin = cabins[booking.cabinId - 1];
        const numNights = subtractDates(booking.endDate, booking.startDate);
        const cabinPrice = numNights * (cabin.regularPrice - cabin.discount);
        const extrasPrice = booking.hasBreakfast ? numNights * 15 * booking.numGuests : 0; // hardcoded breakfast price
        const totalPrice = cabinPrice + extrasPrice;

        let status;
        if (isPast(new Date(booking.endDate)) && !isToday(new Date(booking.endDate)))
            status = "checked-out";
        if (isFuture(new Date(booking.startDate)) || isToday(new Date(booking.startDate)))
            status = "unconfirmed";
        if (
            (isFuture(new Date(booking.endDate)) || isToday(new Date(booking.endDate))) &&
            isPast(new Date(booking.startDate)) &&
            !isToday(new Date(booking.startDate))
        )
            status = "checked-in";

        return {
            ...booking,
            numNights,
            cabinPrice,
            extrasPrice,
            totalPrice,
            guestId: allGuestIds?.[booking.guestId - 1],
            cabinId: allCabinIds?.[booking.cabinId - 1],
            status,
            startDate: new Date(booking.startDate),
            endDate: new Date(booking.endDate),
        };
    });

    console.log(finalBookings);

    try {
        const res = await api.post("/bookings/create-many", finalBookings);
        console.log(res.data?.message);
    } catch (error) {
        console.log("Error creating many bookings: ", error);
    }
}

function Uploader() {
    const [isLoading, setIsLoading] = useState(false);

    async function uploadAll() {
        setIsLoading(true);
        // // Bookings need to be deleted FIRST
        await deleteBookings();
        await deleteGuests();
        await deleteCabins();

        // Bookings need to be created LAST
        await createGuests();
        await createCabins();
        await createBookings();

        setIsLoading(false);
    }

    // async function uploadBookings() {
    //     setIsLoading(true);
    //     await deleteBookings();
    //     await createBookings();
    //     setIsLoading(false);
    // }

    return (
        <div
            style={{
                marginTop: "auto",
                backgroundColor: "#e0e7ff",
                padding: "8px",
                borderRadius: "5px",
                textAlign: "center",
                display: "flex",
                flexDirection: "column",
                gap: "8px",
            }}
        >
            <h3>SAMPLE DATA</h3>

            <Button onClick={uploadAll} disabled={isLoading}>
                Upload ALL
            </Button>

            <Button
                // onClick={   uploadBookings}
                disabled={isLoading}
            >
                Upload bookings ONLY
            </Button>
        </div>
    );
}

export default Uploader;
