import { useCabins } from "./useCabins";
import Spinner from "../../ui/Spinner";
import CabinRow from "./CabinRow";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import { useSearchParams } from "react-router-dom";

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

function CabinTable() {
    const { data, isLoading } = useCabins();
    const [searchParams] = useSearchParams();

    const cabins = data?.data;
    const discount = searchParams.get("discount") || "all";
    const filteredCabins =
        discount === "all"
            ? cabins
            : cabins?.filter(
                  (cabin: CabinType) =>
                      (discount === "no-discount" && !cabin.discount) ||
                      (discount === "with-discount" && cabin.discount),
              );

    if (isLoading) return <Spinner />;

    return (
        <Menus>
            <Table columns="0.6fr 1.8fr 2.2fr 1fr 1fr 1fr">
                <Table.Header>
                    <div></div>
                    <div>Cabin</div>
                    <div>Capacity</div>
                    <div>Price</div>
                    <div>Discount</div>
                    <div></div>
                </Table.Header>

                <Table.Body
                    data={filteredCabins}
                    render={(cabin: CabinType) => (
                        <CabinRow cabin={cabin} key={cabin.id} />
                    )}
                />
            </Table>
        </Menus>
    );
}

export default CabinTable;
