// import { useSearchParams } from "react-router-dom";

import BookingRow from "./BookingRow";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import { useBookings } from "./useBookings";
import Spinner from "../../ui/Spinner";
import { BookingType } from "../../types";
import Empty from "../../ui/Empty";
import Pagination from "../../ui/Pagination";

// type Field = "startDate" | "totalPrice" | "createdAt";
// type Direction = "asc" | "desc";

function BookingTable() {
    const { data, isLoading } = useBookings();
    // const [searchParams] = useSearchParams();

    // const status = searchParams.get("status") || "all";
    // const sortBy = searchParams.get("sortBy") || "createdAt-asc";
    // const [field, direction] = sortBy?.split("-") as [Field, Direction];
    // const modifier = direction === "asc" ? 1 : -1;

    const bookings = data?.data.bookings ?? [];
    const count = data?.data.count ?? 0;

    // const sortedBookings =
    //     sortBy === "createdAt-asc"
    //         ? [...bookings]
    //         : [...bookings].sort(
    //               (a, b) =>
    //                   (Number(new Date(a[field])) - Number(new Date(b[field]))) *
    //                   modifier,
    //           );

    // const filteredBookings =
    //     status === "all"
    //         ? [...sortedBookings]
    //         : sortedBookings.filter((booking: BookingType) => booking.status === status);
    if (isLoading) return <Spinner />;
    if (!bookings?.length) return <Empty resourceName="bookings" />;

    return (
        <Menus type="booking">
            <Table columns="0.6fr 2fr 2.4fr 1.4fr 1fr 3.2rem">
                <Table.Header>
                    <div>Cabin</div>
                    <div>Guest</div>
                    <div>Dates</div>
                    <div>Status</div>
                    <div>Amount</div>
                    <div></div>
                </Table.Header>

                <Table.Body
                    data={bookings}
                    render={(booking: BookingType) => (
                        <BookingRow key={booking.id} booking={booking} />
                    )}
                />
                <Table.Footer>
                    <Pagination count={count} />
                </Table.Footer>
            </Table>
        </Menus>
    );
}

export default BookingTable;
