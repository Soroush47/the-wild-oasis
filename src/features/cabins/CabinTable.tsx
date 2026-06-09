import { useCabins } from "./useCabins";
import Spinner from "../../ui/Spinner";
import CabinRow from "./CabinRow";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import { useSearchParams } from "react-router-dom";
import { CabinType } from "../../types";
import Empty from "../../ui/Empty";
import Pagination from "../../ui/Pagination";
import { PAGE_SIZE } from "../../utils/constants";

type Field = "name" | "regularPrice" | "maxCapacity" | "createdAt";
type Direction = "asc" | "desc";

function CabinTable() {
    const { data, isLoading } = useCabins();
    const [searchParams] = useSearchParams();

    const cabins = data?.data ?? [];
    const filter = searchParams.get("discount") || "all";
    const sortBy = searchParams.get("sortBy") || "createdAt-asc";
    const currentPage = Number(searchParams.get("page")) || 1;
    const [field, direction]: [Field, Direction] = sortBy?.split("-") as [
        Field,
        Direction,
    ];
    const modifier = direction === "asc" ? 1 : -1;

    const sortedCabins =
        field !== "createdAt"
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

    const firstItem = (currentPage - 1) * PAGE_SIZE;
    console.log({ firstItem, currentPage });
    const showCabins = filteredCabins.slice(firstItem, firstItem + PAGE_SIZE);

    if (isLoading) return <Spinner />;
    if (!cabins?.length) return <Empty resourceName="cabins" />;

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
                    data={showCabins}
                    render={(cabin: CabinType) => (
                        <CabinRow cabin={cabin} key={cabin.id} />
                    )}
                />
                <Table.Footer>
                    <Pagination count={filteredCabins.length} />
                </Table.Footer>
            </Table>
        </Menus>
    );
}

export default CabinTable;
