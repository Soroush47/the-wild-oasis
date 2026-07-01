import styled from "styled-components";
import { useRecentBookings } from "./useRecentBookings";
import Spinner from "../../ui/Spinner";
import { useRecentStays } from "./useRecentStays";
import Stats from "./Stats";
import { useCabins } from "../cabins/useCabins";

const StyledDashboardLayout = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    grid-template-rows: auto 34rem auto;
    gap: 2.4rem;
`;

function DashboardLayout() {
    const { bookings, isLoading: isBookingsLoading } = useRecentBookings();
    const {
        stays,
        confirmedStays,
        isLoading: isStaysLoading,
        numDays,
    } = useRecentStays();
    const { data, isLoading: isCabinsLoading } = useCabins();

    const cabins = data?.data;

    if (isBookingsLoading || isStaysLoading || isCabinsLoading) return <Spinner />;

    console.log(bookings, stays, confirmedStays);

    console.log(cabins);

    return (
        <StyledDashboardLayout>
            <Stats
                bookings={bookings}
                confirmedStays={confirmedStays}
                numDays={numDays}
                cabinsCount={cabins.length}
            />
            <div>Today's activity</div>
            <div>Chart stay durations</div>
            <div>Chart sales</div>
        </StyledDashboardLayout>
    );
}

export default DashboardLayout;
