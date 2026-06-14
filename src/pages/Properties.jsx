import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import PropertyCard from "../components/PropertyCard";
import { fetchProperties } from "../api/propertiesApi";

export default function Properties() {
  const [properties, setProperties] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(true);

  // filters
  const [search, setSearch] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [typeFilter, setTypeFilter] = useState("");
  const [bedroomFilter, setBedroomFilter] = useState("");
  const [locationFilter, setLocationFilter] = useState("");

  // FETCH DATA
  useEffect(() => {
    fetchProperties()
      .then((results) => {
        setProperties(results);
        setFiltered(results);
      })
      .catch((err) => {
        Swal.fire({
          icon: "error",
          title: "API Error",
          text: err.message,
        });
      })
      .finally(() => setLoading(false));
  }, []);

  // FILTER LOGIC
  useEffect(() => {
    let result = [...properties];

    if (search.trim()) {
      result = result.filter((p) =>
        (p.name || "")
          .toLowerCase()
          .includes(search.toLowerCase())
      );
    }

    if (maxPrice) {
      result = result.filter(
        (p) => p.price <= Number(maxPrice)
      );
    }

    if (typeFilter) {
      result = result.filter((p) => p.type === typeFilter);
    }

    if (bedroomFilter) {
      result = result.filter(
        (p) => p.bedrooms >= Number(bedroomFilter)
      );
    }

    if (locationFilter.trim()) {
      result = result.filter((p) =>
        (p.location || "")
          .toLowerCase()
          .includes(locationFilter.toLowerCase())
      );
    }

    setFiltered(result);
  }, [
    search,
    maxPrice,
    typeFilter,
    bedroomFilter,
    locationFilter,
    properties,
  ]);

  // RESET FILTERS
  const resetFilters = () => {
    setSearch("");
    setMaxPrice("");
    setTypeFilter("");
    setBedroomFilter("");
    setLocationFilter("");
  };

  // LOADING STATE
  if (loading) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
      {Array(6).fill(0).map((_, i) => (
        <div key={i} className="h-64 bg-gray-200 animate-pulse rounded-2xl"></div>
      ))}
    </div>
  );
}

  return (
    <div className="min-h-screen bg-gray-50 p-6">

      {/* HEADER */}
      <div className="mb-6">
        <h1 className="text-4xl font-bold text-gray-800">
          Find Your Perfect Stay 🏡
        </h1>
        <p className="text-gray-500 mt-1">
          Search modern apartments, villas, and studios in Nairobi
        </p>
      </div>

      {/* FILTER BAR */}
      <div className="bg-white p-4 rounded-2xl shadow-md mb-6 flex flex-wrap gap-3 items-center">

        {/* SEARCH */}
        <input
          className="border p-2 rounded-lg flex-1 min-w-[180px]"
          placeholder="Search property..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        {/* PRICE */}
        <input
          className="border p-2 rounded-lg w-32"
          placeholder="Max Price"
          type="number"
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
        />

        {/* TYPE */}
        <select
          className="border p-2 rounded-lg"
          value={typeFilter}
          onChange={(e) => setTypeFilter(e.target.value)}
        >
          <option value="">All Types</option>
          <option value="Apartment">Apartment</option>
          <option value="Villa">Villa</option>
          <option value="Studio">Studio</option>
        </select>

        {/* BEDROOMS */}
        <select
          className="border p-2 rounded-lg"
          value={bedroomFilter}
          onChange={(e) => setBedroomFilter(e.target.value)}
        >
          <option value="">Bedrooms</option>
          <option value="1">1+</option>
          <option value="2">2+</option>
          <option value="3">3+</option>
        </select>

        {/* LOCATION */}
        <input
          className="border p-2 rounded-lg"
          placeholder="Location"
          value={locationFilter}
          onChange={(e) => setLocationFilter(e.target.value)}
        />

        {/* RESET */}
        <button
          onClick={resetFilters}
          className="bg-gray-800 text-white px-4 py-2 rounded-lg hover:bg-black transition"
        >
          Reset
        </button>
      </div>

      {/* EMPTY STATE */}
      {filtered.length === 0 ? (
        <div className="text-center text-gray-500 mt-10">
          No properties found 😢
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((p) => (
            <PropertyCard key={p.id} property={p} />
          ))}
        </div>
      )}
    </div>
  );
}