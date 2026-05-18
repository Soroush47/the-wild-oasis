// import { useEffect } from "react";
import Heading from "../ui/Heading";
import Row from "../ui/Row";
// import { getCabins } from "../services/apiCabins";
import CabinTable from "../features/cabins/CabinTable";
import { useState } from "react";
import Button from "../ui/Button";
import CreateCabinForm from "../features/cabins/CreateCabinForm";
import styled from "styled-components";

const Container = styled.div`
    margin: 0 auto;
`;

function Cabins() {
    const [showForm, setShowForm] = useState(false);
    // useEffect(() => {
    //     const getData = async () => {
    //         try {
    //             const res = await getCabins();
    //             console.log(res.data);
    //         } catch (e) {
    //             console.log(e);
    //         }
    //     };
    //     getData();
    // }, []);

    return (
        <>
            <Row type="horizontal">
                <Heading as="h1">All cabins</Heading>
                <p>Filter/Sort</p>
            </Row>
            <Row>
                <CabinTable />
                <Container>
                    <Button onClick={() => setShowForm(show => !show)}>
                        Add new cabin
                    </Button>
                </Container>
                {showForm && <CreateCabinForm />}
            </Row>
        </>
    );
}

export default Cabins;
