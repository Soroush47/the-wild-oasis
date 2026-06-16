import styled from "styled-components";
import Button from "./Button";
import Heading from "./Heading";
// import { useDeleteCabin } from "../features/cabins/useDeleteCabin";

const StyledConfirmDelete = styled.div`
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
`;

interface ConfirmDeleteProps {
    resourceName: string;
    onConfirm: () => void;
    disabled?: boolean;
    onCloseModal?: () => void;
    // id: number;
}

function ConfirmDelete({
    resourceName,
    // id,
    onCloseModal,
    disabled,
    onConfirm,
}: ConfirmDeleteProps) {
    // const handleDelete = () => {
    //     deleteMutation(id, {
    //         onSuccess: () => onCloseModal?.(),
    //     });
    // };

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
