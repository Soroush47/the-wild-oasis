// import styled from "styled-components";
// import { BookingType } from "../../types";
// import Tag from "../../ui/Tag";
// import { Flag } from "../../ui/Flag";
// import Button from "../../ui/Button";
// import { Link } from "react-router-dom";
// import CheckoutButton from "./CheckoutButton";
// import { medias } from "../../styles/medias";

// const StyledTodayItem = styled.li`
//     display: grid;
//     grid-template-columns: 9rem 2rem 1fr 7rem 9rem;
//     gap: 1.2rem;
//     align-items: center;

//     font-size: 1.4rem;
//     padding: 0.8rem 0;
//     border-bottom: 1px solid var(--color-grey-100);

//     &:first-child {
//         border-top: 1px solid var(--color-grey-100);
//     }

//     ${medias.mobile} {
//         /* grid-template-columns: none; */
//         /* justify-items: center; */
//     }
// `;

// const Guest = styled.div`
//     font-weight: 500;
// `;

// interface TodayItemProps {
//     activity: BookingType;
// }

// function TodayItem({ activity }: TodayItemProps) {
//     const { id, status, guest, numNights } = activity;

//     console.log({ id, guest, numNights });

//     return (
//         <StyledTodayItem>
//             {status === "unconfirmed" && <Tag type="green">Arriving</Tag>}
//             {status === "checked-in" && <Tag type="blue">Departing</Tag>}
//             <Flag src={guest.countryFlag} alt={`Flag of ${guest.nationality}`} />
//             <Guest>{guest.fullName}</Guest>
//             <div>{numNights} nights</div>
//             <div>
//                 {status === "unconfirmed" && (
//                     <Button
//                         size="small"
//                         $variation="primary"
//                         as={Link}
//                         to={`/checkin/${id}`}
//                     >
//                         Check in
//                     </Button>
//                 )}
//                 {status === "checked-in" && <CheckoutButton bookingId={id} />}
//             </div>
//         </StyledTodayItem>
//     );
// }

// export default TodayItem;

import styled from "styled-components";
import { Link } from "react-router-dom";

import { BookingType } from "../../types";
import Tag from "../../ui/Tag";
import { Flag } from "../../ui/Flag";
import Button from "../../ui/Button";
import CheckoutButton from "./CheckoutButton";
import { medias } from "../../styles/medias";

const StyledTodayItem = styled.li`
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 2rem;

    padding: 1.2rem 0;
    border-bottom: 1px solid var(--color-grey-100);

    &:first-child {
        border-top: 1px solid var(--color-grey-100);
    }

    ${medias.mobile} {
        flex-direction: column;
        align-items: stretch;
        gap: 1.2rem;
    }
`;

const Left = styled.div`
    display: flex;
    align-items: center;
    gap: 1.2rem;
    flex-wrap: wrap;

    ${medias.mobile} {
        justify-content: space-between;
    }
`;

const GuestWrapper = styled.div`
    display: flex;
    align-items: center;
    gap: 0.8rem;
`;

const Guest = styled.div`
    font-weight: 500;
`;

const Nights = styled.div`
    color: var(--color-grey-500);
`;

const Right = styled.div`
    display: flex;
    justify-content: flex-end;

    ${medias.mobile} {
        width: 100%;

        & > * {
            width: 100%;
        }
    }
`;

interface TodayItemProps {
    activity: BookingType;
}

function TodayItem({ activity }: TodayItemProps) {
    const { id, status, guest, numNights } = activity;

    return (
        <StyledTodayItem>
            <Left>
                {status === "unconfirmed" ? (
                    <Tag type="green">Arriving</Tag>
                ) : (
                    <Tag type="blue">Departing</Tag>
                )}

                <GuestWrapper>
                    <Flag src={guest.countryFlag} alt={`Flag of ${guest.nationality}`} />
                    <Guest>{guest.fullName}</Guest>
                </GuestWrapper>

                <Nights>{numNights} nights</Nights>
            </Left>

            <Right>
                {status === "unconfirmed" ? (
                    <Button
                        size="small"
                        $variation="primary"
                        as={Link}
                        to={`/checkin/${id}`}
                    >
                        Check in
                    </Button>
                ) : (
                    <CheckoutButton bookingId={id} />
                )}
            </Right>
        </StyledTodayItem>
    );
}

export default TodayItem;
