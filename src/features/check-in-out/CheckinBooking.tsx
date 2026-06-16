import styled from "styled-components";

import BookingDataBox from "../bookings/BookingDataBox";

import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import ButtonText from "../../ui/ButtonText";
import Spinner from "../../ui/Spinner";

import { useMoveBack } from "../../hooks/useMoveBack";
import { useBooking } from "../bookings/useBooking";
import Checkbox from "../../ui/Checkbox";
import { useEffect, useState } from "react";
import { formatCurrency } from "../../utils/helpers";
import { useCheckin } from "./useCheckin";
import { useSettings } from "../settings/useSettings";

const Box = styled.div`
    background-color: var(--color-grey-0);
    border: 1px solid var(--color-grey-100);
    border-radius: var(--border-radius-md);
    padding: 2.4rem 4rem;
`;

function CheckinBooking() {
    const [confirmPaid, setConfirmPaid] = useState(false);
    const [addBreakfast, setAddBreakfast] = useState(false);
    const { data, error, isLoading } = useBooking();
    const { checkinMutation, isCheckingIn } = useCheckin();
    const { settings, isLoading: isLoadingSettings } = useSettings();
    const moveBack = useMoveBack();

    useEffect(() => {
        setConfirmPaid(data?.data.isPaid ?? false);
        // setAddBreakfast(data?.data.hasBreakfast ?? false);
    }, [data]);

    const booking = data?.data;

    if (isLoading || isLoadingSettings) return <Spinner />;
    if (error) return null;

    const {
        id: bookingId,
        guest,
        isPaid,
        totalPrice,
        numGuests,
        hasBreakfast,
        numNights,
        cabinPrice,
        extrasPrice,
    } = booking;

    const optionalBreakfastPrice = settings.breakfastPrice * numGuests * numNights;

    function handleCheckin() {
        if (!confirmPaid) return null;
        addBreakfast
            ? checkinMutation({
                  id: bookingId,
                  breakfast: {
                      hasBreakfast: true,
                      extrasPrice: optionalBreakfastPrice,
                      totalPrice: optionalBreakfastPrice + totalPrice,
                  },
              })
            : checkinMutation({ id: bookingId, breakfast: null });
    }

    console.log({ confirmPaid, addBreakfast, hasBreakfast, totalPrice });

    return (
        <>
            <Row type="horizontal">
                <Heading as="h1">Check in booking #{bookingId}</Heading>
                <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
            </Row>

            <BookingDataBox booking={booking} />

            {!hasBreakfast && (
                <Box>
                    <Checkbox
                        checked={addBreakfast}
                        id="breakfast"
                        onChange={() => {
                            setAddBreakfast(add => !add);
                            (isPaid || confirmPaid) &&
                                (addBreakfast
                                    ? setConfirmPaid(true)
                                    : setConfirmPaid(false));
                        }}
                        disabled={hasBreakfast || isCheckingIn}
                    >
                        Want to add breakfast for {formatCurrency(optionalBreakfastPrice)}
                    </Checkbox>
                </Box>
            )}
            <Box>
                <Checkbox
                    checked={confirmPaid}
                    id="confirm"
                    onChange={() => setConfirmPaid(confirm => !confirm)}
                    disabled={(isPaid && confirmPaid && !addBreakfast) || isCheckingIn}
                >
                    I confirm that {guest.fullName} has paid the total amount of{" "}
                    {!addBreakfast
                        ? formatCurrency(totalPrice)
                        : `${formatCurrency(hasBreakfast ? totalPrice : totalPrice + optionalBreakfastPrice)} (${formatCurrency(hasBreakfast ? cabinPrice : totalPrice)} + ${formatCurrency(hasBreakfast ? extrasPrice : optionalBreakfastPrice)})`}
                </Checkbox>
            </Box>

            <ButtonGroup>
                <Button onClick={handleCheckin} disabled={!confirmPaid || isCheckingIn}>
                    Check in booking #{bookingId}
                </Button>
                <Button $variation="secondary" onClick={moveBack} disabled={isCheckingIn}>
                    Back
                </Button>
            </ButtonGroup>
        </>
    );
}

export default CheckinBooking;
