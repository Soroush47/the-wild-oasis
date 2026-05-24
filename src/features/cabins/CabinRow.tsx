import styled from "styled-components";

import { HiPencil, HiSquare2Stack, HiTrash } from "react-icons/hi2";
import { formatCurrency } from "../../utils/helpers";
// import Button from "../../ui/Button";

import { useCreateCabin } from "./useCreateCabin";
import CreateCabinForm from "./CreateCabinForm";
import Modal from "../../ui/Modal";
import ConfirmDelete from "../../ui/ConfirmDelete";

const TableRow = styled.div`
    display: grid;
    grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr;
    column-gap: 2.4rem;
    align-items: center;
    padding: 1.4rem 2.4rem;
    &:not(:last-child) {
        border-bottom: 1px solid var(--color-grey-100);
    }
`;

const Img = styled.img`
    display: block;
    width: 6.4rem;
    aspect-ratio: 3 / 2;
    object-fit: cover;
    object-position: center;
    transform: scale(1.5) translateX(-7px);
`;

const Cabin = styled.div`
    font-size: 1.6rem;
    font-weight: 600;
    color: var(--color-grey-600);
    font-family: "Sono";
`;

const Price = styled.div`
    font-family: "Sono";
    font-weight: 600;
`;

const Discount = styled.div`
    font-family: "Sono";
    font-weight: 500;
    color: var(--color-green-700);
`;

type CabinType = {
    id: number;
    createdAt: Date;
    name: string;
    maxCapacity: number;
    regularPrice: number;
    discount: number;
    description: string;
    image: string;
};

type CabinRowProps = {
    cabin: CabinType;
};

function CabinRow({ cabin }: CabinRowProps) {
    const {
        id: cabinId,
        name,
        maxCapacity,
        regularPrice,
        discount,
        image,
        description,
    } = cabin;
    const { isCreating, createMutation } = useCreateCabin();

    const handleDuplicate = () => {
        createMutation({
            name: `Copy of ${name}`,
            maxCapacity,
            regularPrice,
            discount,
            description,
            image: image.slice(16),
        });
    };

    return (
        <>
            <TableRow role="row">
                <Img src={image} />
                <Cabin>{name}</Cabin>
                <div>Fits up to {maxCapacity} guests</div>
                <Price>{formatCurrency(regularPrice)}</Price>
                {discount ? (
                    <Discount>{formatCurrency(discount)}</Discount>
                ) : (
                    <span>&mdash;</span>
                )}
                <div>
                    <button onClick={handleDuplicate} disabled={isCreating}>
                        <HiSquare2Stack />
                    </button>
                    <Modal>
                        <Modal.Open opens="edit-cabin">
                            <button
                            //  size="small"
                            >
                                <HiPencil />
                            </button>
                        </Modal.Open>
                        <Modal.Window name="edit-cabin">
                            <CreateCabinForm cabin={cabin} />
                        </Modal.Window>
                        <Modal.Open opens="delete-cabin">
                            <button
                            // $variation="danger" //Transient Props
                            // size="small"
                            >
                                <HiTrash />
                            </button>
                        </Modal.Open>
                        <Modal.Window name="delete-cabin">
                            <ConfirmDelete resourceName="Cabins" cabinId={cabinId} />
                        </Modal.Window>
                    </Modal>
                </div>
            </TableRow>
        </>
    );
}

export default CabinRow;
