// import { useState } from "react";
import Button from "../../ui/Button";
import CreateCabinForm from "./CreateCabinForm";
import Modal from "../../ui/Modal";

function AddCabin() {
    return (
        <Modal>
            <Modal.Open opens="cabin-form">
                <Button>Add new cabin</Button>
            </Modal.Open>
            <Modal.Window name="cabin-form">
                <CreateCabinForm />
            </Modal.Window>
        </Modal>
    );
}

// function AddCabin() {
//     const [isOpenModal, setIsOpenModal] = useState(false);

//     const handleClose = () => {
//         setIsOpenModal(false);
//     };

//     return (
//         <div>
//             <Button onClick={() => setIsOpenModal(show => !show)}>Add new cabin</Button>
//             {/* {isOpenModal && <CreateCabinForm setIsOpenModal={setIsOpenModal} />} */}
//             {isOpenModal && (
//                 <Modal onClose={handleClose}>
//                     <CreateCabinForm onCloseModal={handleClose} />
//                 </Modal>
//             )}
//         </div>
//     );
// }

export default AddCabin;
