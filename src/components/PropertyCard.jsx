import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { motion } from "framer-motion";

export default function PropertyCard({ property }) {
  const addToFavorites = () => {
    const existing = JSON.parse(localStorage.getItem("favorites")) || [];

    if (!existing.find((p) => p.id === property.id)) {
      localStorage.setItem(
        "favorites",
        JSON.stringify([...existing, property])
      );

      Swal.fire({
        icon: "success",
        title: "Saved",
        text: "Added to favorites",
        timer: 1200,
        showConfirmButton: false,
      });
    }
  };

  return (
    <motion.div
        className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.98 }}
        transition={{ duration: 0.3 }}
    >

      {/* IMAGE */}
      <div className="relative">
        <img
          src={property.image}
          className="w-full h-52 object-cover"
        />

        {/* TYPE BADGE */}
        <div className="absolute top-3 left-3 bg-black text-white text-xs px-2 py-1 rounded-full">
          {property.type}
        </div>
      </div>

      {/* CONTENT */}
      <div className="p-4">

        <h2 className="text-lg font-semibold text-gray-800">
          {property.name}
        </h2>

        <p className="text-gray-500 text-sm">
          📍 {property.location}
        </p>

        <p className="text-sm text-gray-500 mt-1">
          🛏 {property.bedrooms} Beds • 🚿 {property.bathrooms} Baths
        </p>

        <div className="flex justify-between items-center mt-4">

          <p className="text-blue-600 font-bold text-lg">
            KES {property.price}
          </p>

          <div className="flex gap-2">

            <Link
              to={`/property/${property.id}`}
              className="bg-gray-900 text-white px-3 py-1 rounded-lg text-sm"
            >
              View
            </Link>

            <button
              onClick={addToFavorites}
              className="bg-red-500 text-white px-3 py-1 rounded-lg text-sm"
            >
              ♥
            </button>

          </div>
        </div>

      </div>
    </motion.div>
  );
}