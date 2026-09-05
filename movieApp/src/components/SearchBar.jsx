import { useState } from "react";

function SearchBar({ onSearch }) {

    const [search, setSearch] = useState("");

    function handleSearch() {
        onSearch(search);
    }

    return (
        <div className="mt-8 flex gap-3">

            <input
                type="text"
                placeholder="Search for a movie..."
                value={search}
                onChange={(e) => {
                    setSearch(e.target.value);
                }}
                className="w-full max-w-md rounded-lg border border-gray-900 px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
            />

            <button
                onClick={handleSearch}
                className="rounded-lg bg-gray-900 px-6 py-3 font-semibold text-white hover:bg-blue-700"
            >
                Search
            </button>

        </div>
    );
}

export default SearchBar;