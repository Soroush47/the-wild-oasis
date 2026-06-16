import { useSearchParams } from "react-router-dom";
import Select from "./Select";
import { ChangeEvent } from "react";

type Option = {
    value: string;
    label: string;
};

interface SortByProps {
    options: Option[];
}

function SortBy({ options }: SortByProps) {
    const [searchParams, setSearchParams] = useSearchParams();

    const sort = searchParams.get("sortBy") || "createdAt-asc";

    const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
        const value = event.target.value;
        searchParams.set("sortBy", value);
        searchParams.get("page") && searchParams.set("page", "1");
        setSearchParams(searchParams);
    };

    return <Select options={options} type="white" value={sort} onChange={handleChange} />;
}

export default SortBy;
