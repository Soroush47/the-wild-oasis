import styled from "styled-components";
import Button from "./Button";
import Heading from "./Heading";
import { medias } from "../styles/medias";
// import { useDeleteCabin } from "../features/cabins/useDeleteCabin";

const StyledConfirmDelete = styled.div`
    max-width: 47rem;
    width: 47rem;
    display: flex;
    flex-direction: column;
    gap: 1.2rem;

    & p {
        color: var(--color-grey-500);
        margin-bottom: 1.2rem;
    }

    & div {
        display: flex;
        justify-content: flex-end;
        gap: 1.2rem;
    }

    ${medias.tablet} {
        width: 65vw;
    }

    ${medias.smallMobile} {
        & > div {
            flex-direction: column-reverse;
            padding: 0rem 5rem;
            width: 80%;
            min-width: 30rem;
            align-self: center;
            margin-top: 2rem;
        }
    }
`;

interface ConfirmDeleteProps {
    resourceName: string;
    onConfirm: () => void;
    disabled?: boolean;
    onCloseModal?: () => void;
}

function ConfirmDelete({
    resourceName,
    onCloseModal,
    disabled,
    onConfirm,
}: ConfirmDeleteProps) {
    return (
        <StyledConfirmDelete>
            <Heading as="h3">Delete {resourceName}</Heading>
            <p>
                Are you sure you want to delete this {resourceName} permanently? This
                action cannot be undone.
            </p>

            <div>
                <Button $variation="secondary" disabled={disabled} onClick={onCloseModal}>
                    Cancel
                </Button>
                <Button $variation="danger" disabled={disabled} onClick={onConfirm}>
                    Delete
                </Button>
            </div>
        </StyledConfirmDelete>
    );
}

export default ConfirmDelete;
