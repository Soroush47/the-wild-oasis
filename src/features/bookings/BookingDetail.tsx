import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import { useBooking } from "./useBooking";
import { useMoveBack } from "../../hooks/useMoveBack";

import BookingDataBox from "./BookingDataBox";
import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import Tag from "../../ui/Tag";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import ButtonText from "../../ui/ButtonText";
import Spinner from "../../ui/Spinner";
import { useCheckout } from "../check-in-out/useCheckout";
import { useDeleteBooking } from "./useDeleteBooking";
import Modal from "../../ui/Modal";
import ConfirmDelete from "../../ui/ConfirmDelete";

const HeadingGroup = styled.div`
    display: flex;
    gap: 2.4rem;
    align-items: center;
`;

type Status = "unconfirmed" | "checked-in" | "checked-out";

function BookingDetail() {
    const navigate = useNavigate();
    const moveBack = useMoveBack();
    const { data, error, isLoading } = useBooking();
    const { checkoutMutation, isCheckingOut } = useCheckout();
    const { deleteMutation, isDeleting } = useDeleteBooking();

    const status = data?.data.status as Status;
    const id = data?.data.id;

    const statusToTagName = {
        unconfirmed: "blue",
        "checked-in": "green",
        "checked-out": "silver",
    };

    if (isLoading) return <Spinner />;
    if (error) return null;

    console.log(data?.data);

    return (
        <>
            <Row type="horizontal">
                <HeadingGroup>
                    <Heading as="h1">Booking #{id}</Heading>
                    <Tag type={statusToTagName[status]}>{status.replace("-", " ")}</Tag>
                </HeadingGroup>
                <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
            </Row>

            <BookingDataBox booking={data?.data} />

            <ButtonGroup>
                <Modal>
                    <Modal.Open opens="delete">
                        <Button $variation="danger">Delete</Button>
                    </Modal.Open>
                    <Modal.Window name="delete">
                        <ConfirmDelete
                            resourceName="booking"
                            onConfirm={() =>
                                deleteMutation(id, {
                                    onSettled: () => navigate(-1),
                                })
                            }
                            disabled={isDeleting}
                        />
                    </Modal.Window>
                </Modal>
                {status === "unconfirmed" && (
                    <Button onClick={() => navigate(`/checkin/${id}`)}>Check in</Button>
                )}
                {status === "checked-in" && (
                    <Button
                        onClick={() => {
                            checkoutMutation(id);
                        }}
                        disabled={isCheckingOut}
                    >
                        Check out
                    </Button>
                )}
                <Button $variation="secondary" onClick={moveBack}>
                    Back
                </Button>
            </ButtonGroup>
        </>
    );
}

export default BookingDetail;
