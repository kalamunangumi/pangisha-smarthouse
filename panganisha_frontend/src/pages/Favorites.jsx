import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function Favorites() {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(data);
  }, []);

  const removeFavorite = (id) => {
    const updated = favorites.filter((item) => item.id !== id);
    setFavorites(updated);
    localStorage.setItem("favorites", JSON.stringify(updated));
  };

  return (
    <div className="p-6">

      <h1 className="text-3xl font-bold mb-6">
        My Favorite Properties ❤️
      </h1>

      {favorites.length === 0 ? (
        <p className="text-gray-500">
          No favorites yet.
        </p>
      ) : (
        <div className="grid md:grid-cols-3 gap-4">

          {favorites.map((item) => (
            <div
              key={item.id}
              className="bg-white shadow rounded-xl p-4"
            >
              <img
                src={item.image}
                className="w-full h-48 object-cover rounded"
              />

              <h2 className="font-bold mt-2">
                {item.name}
              </h2>

              <p className="text-gray-600">
                KES {item.price}
              </p>

              <div className="flex gap-2 mt-3">

                <Link
                  to={`/property/${item.id}`}
                  className="bg-blue-600 text-white px-3 py-1 rounded"
                >
                  View
                </Link>

                <button
                  onClick={() => removeFavorite(item.id)}
                  className="bg-red-500 text-white px-3 py-1 rounded"
                >
                  Remove
                </button>

              </div>
            </div>
          ))}

        </div>
      )}

    </div>
  );
}