"use client";

import { Search } from "lucide-react";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { useCallback } from "react";

const routerOptions = {
    shallow: true,
};

const SearchBar = () => {
    const searchParams = useSearchParams();
    const pathName = usePathname();
    const router = useRouter();

    const createQueryString = useCallback(
        (name, value) => {
            const params = new URLSearchParams(searchParams);
            params.set(name, value);

            return params.toString();
        },
        [searchParams]
    );

    const handleSearch = (event) => {
        if (event.target.value === "") {
            clearParams();
        } else {
            router.push(
                `${pathName}/?${createQueryString("search", event.target.value)}`,
                routerOptions
            );
        }
    };

    function clearParams() {
        router.push(`${pathName}`, routerOptions);
    }

    return (
        <div className="flex items-center rounded-3xl border border-input px-4 py-2 ml-auto mr-5 md:mx-2 ">
            <input
                type="text"
                name="search"
                placeholder="Search"
                className="w-20 xs:w-28 bg-transparent h-full  outline-none text-sm text-white"
                onChange={handleSearch}
                value={searchParams.get("search") || ""}
            />
            <Search className="w-5 h-5" />
        </div>
    );
};

export default SearchBar;
