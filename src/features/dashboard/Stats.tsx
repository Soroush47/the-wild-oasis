import {
    HiOutlineBanknotes,
    HiOutlineBriefcase,
    HiOutlineCalendarDays,
    HiOutlineChartBar,
} from "react-icons/hi2";
import Stat from "./Stat";
import { BookingType } from "../../types";
import { formatCurrency } from "../../utils/helpers";

interface StatsProps {
    bookings: BookingType[];
    confirmedStays: BookingType[];
    numDays: number;
    cabinsCount: number;
}

function Stats({ bookings, confirmedStays, numDays, cabinsCount }: StatsProps) {
    const numBookings = bookings.length;

    const sales = bookings.reduce((acc, cur) => acc + cur.totalPrice, 0);

    const checkins = confirmedStays.length;

    // num checked in nights / all available nights (num days * num cabins)
    const occupation = bookings.length
        ? Math.round(
              (confirmedStays.reduce((acc, cur) => acc + cur.numNights, 0) /
                  (numDays * cabinsCount)) *
                  100,
          ) + "%"
        : "-";

    return (
        <>
            <Stat
                title="Bookings"
                color="blue"
                icon={<HiOutlineBriefcase />}
                value={numBookings}
            />
            <Stat
                title="Sales"
                color="green"
                icon={<HiOutlineBanknotes />}
                value={formatCurrency(sales)}
            />
            <Stat
                title="Check ins"
                color="indigo"
                icon={<HiOutlineCalendarDays />}
                value={checkins}
            />
            <Stat
                title="Occupancy rate"
                color="yellow"
                icon={<HiOutlineChartBar />}
                value={occupation}
            />
        </>
    );
}

export default Stats;
