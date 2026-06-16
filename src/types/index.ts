export interface CabinType {
    id: number;
    createdAt: Date;
    name: string;
    maxCapacity: number;
    regularPrice: number;
    discount: number;
    description: string;
    image: string;
}

export interface BookingType {
    id: number;
    createdAt: Date;
    startDate: Date;
    endDate: Date;
    numNights: number;
    numGuests: number;
    cabinPrice: number;
    extrasPrice: number;
    totalPrice: number;
    status: "unconfirmed" | "checked-in" | "checked-out";
    hasBreakfast: boolean;
    isPaid: boolean;
    observations: string;
    // cabinId: number;
    // guestId: number;
    cabin: { name: string };
    guest: {
        fullName: string;
        email: string;
        nationality?: string;
        countryFlag?: string;
        nationalID?: string;
    };
}


export interface Settings {
    minBookingLength: number;
    maxBookingLength: number;
    maxGuestsPerBooking: number;
    breakfastPrice: number;
}