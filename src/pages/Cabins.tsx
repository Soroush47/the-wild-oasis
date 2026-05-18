// import { useEffect } from "react";
import Heading from "../ui/Heading";
import Row from "../ui/Row";
// import { getCabins } from "../services/apiCabins";
import CabinTable from "../features/cabins/CabinTable";

function Cabins() {
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
            </Row>
        </>
    );
}

export default Cabins;
