import styled from "styled-components";
import { useRecentBookings } from "./useRecentBookings";
import Spinner from "../../ui/Spinner";
import { useRecentStays } from "./useRecentStays";
import Stats from "./Stats";
import { useCabins } from "../cabins/useCabins";
import SalesChart from "./SalesChart";
import DurationChart from "./DurationChart";
import TodayActivity from "../check-in-out/TodayActivity";
import { medias } from "../../styles/medias";

const StyledDashboardLayout = styled.div`
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-template-rows: auto 34rem auto;
    gap: 2.4rem;

    ${medias.wideDesktop} {
        grid-template-columns: repeat(2, 1fr);
        grid-template-rows: auto;
    }

    ${medias.desktop} {
        /* grid-template-columns: repeat(2, 1fr); */
    }

    ${medias.mobile} {
        gap: var(--space-4);
    }

    ${medias.statsMobile} {
        grid-template-columns: repeat(1, 1fr);
    }
`;

function DashboardLayout() {
    const { bookings, isLoading: isBookingsLoading } = useRecentBookings();
    const {
        confirmedStays,
        isLoading: isStaysLoading,
        isFetching,
        numDays,
    } = useRecentStays();
    const { data, isLoading: isCabinsLoading } = useCabins();

    const cabins = data?.data;

    if (isBookingsLoading || isStaysLoading || isCabinsLoading || isFetching)
        return <Spinner />;

    return (
        <StyledDashboardLayout>
            <Stats
                bookings={bookings}
                confirmedStays={confirmedStays}
                numDays={numDays}
                cabinsCount={cabins.length}
            />
            <TodayActivity />
            <DurationChart confirmedStays={confirmedStays} />
            <SalesChart bookings={bookings} numDays={numDays} />
        </StyledDashboardLayout>
    );
}

export default DashboardLayout;
