import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">

      {/* HERO SECTION */}
      <div className="flex flex-col items-center justify-center text-center px-6 py-24">
        
        <h1 className="text-5xl md:text-6xl font-extrabold text-gray-800">
          Find Your Perfect Home 🏡
        </h1>

        <p className="mt-6 text-lg text-gray-600 max-w-2xl">
          Pangisha Smart House helps you discover modern apartments,
          studios, and homes with ease. Search, filter, and save your favorites instantly.
        </p>

        <div className="mt-8 flex gap-4">
          <Link
            to="/properties"
            className="bg-blue-600 text-white px-6 py-3 rounded-xl text-lg shadow-lg hover:bg-blue-700 transition"
          >
            Browse Properties
          </Link>

          <Link
            to="/favorites"
            className="bg-gray-200 text-gray-800 px-6 py-3 rounded-xl text-lg hover:bg-gray-300 transition"
          >
            My Favorites
          </Link>
        </div>
      </div>

      {/* FEATURE SECTION */}
      <div className="grid md:grid-cols-3 gap-6 px-10 pb-20">

        <div className="bg-white shadow-lg rounded-xl p-6 text-center">
          <h3 className="text-xl font-bold">🔍 Smart Search</h3>
          <p className="text-gray-600 mt-2">
            Find properties instantly with filters and search tools.
          </p>
        </div>

        <div className="bg-white shadow-lg rounded-xl p-6 text-center">
          <h3 className="text-xl font-bold">❤️ Save Favorites</h3>
          <p className="text-gray-600 mt-2">
            Keep track of homes you love in one place.
          </p>
        </div>

        <div className="bg-white shadow-lg rounded-xl p-6 text-center">
          <h3 className="text-xl font-bold">⚡ Fast & Simple</h3>
          <p className="text-gray-600 mt-2">
            Lightweight, fast, and easy to use.
          </p>
        </div>

      </div>

    </div>
  );
}