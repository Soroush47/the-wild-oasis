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

type Field = "name" | "regularPrice" | "maxCapacity" | "start";
type Direction = "asc" | "desc" | "date";

function CabinTable() {
    const { data, isLoading } = useCabins();
    const [searchParams] = useSearchParams();

    const cabins = data?.data ?? [];
    const filter = searchParams.get("discount") || "all";
    const sortBy = searchParams.get("sortBy") || "start-date";
    const [field, direction]: [Field, Direction] = sortBy?.split("-") as [
        Field,
        Direction,
    ];
    const modifier = direction === "asc" ? 1 : -1;

    const sortedCabins =
        field !== "start"
            ? [...cabins].sort((a: CabinType, b: CabinType) => {
                  if (field === "name") {
                      if (a.name.toLocaleUpperCase() < b.name.toLocaleUpperCase())
                          return -1 * modifier;
                      if (a.name.toLocaleUpperCase() > b.name.toLocaleUpperCase())
                          return 1 * modifier;
                      return 0;
                  }
                  return (a[field] - b[field]) * modifier;
              })
            : [...cabins];

    const filteredCabins =
        filter === "all"
            ? sortedCabins
            : sortedCabins?.filter(
                  (cabin: CabinType) =>
                      (filter === "no-discount" && !cabin.discount) ||
                      (filter === "with-discount" && cabin.discount),
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
