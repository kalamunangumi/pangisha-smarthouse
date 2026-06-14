import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const houseImages = [
  "https://images.unsplash.com/photo-1600585154340-be6161a56a0c",
  "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9",
  "https://images.unsplash.com/photo-1570129477492-45c003edd2be",
  "https://images.unsplash.com/photo-1568605114967-8130f3a36994",
];

export default function PropertyDetails() {
  const { id } = useParams();
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const res = await fetch(`https://dummyjson.com/products/${id}`);

        if (!res.ok) {
          throw new Error("Failed to fetch property");
        }

        const data = await res.json();

        setProperty({
          id: data.id,
          name: data.title,
          price: data.price * 100,
          image:
            houseImages[Math.floor(Math.random() * houseImages.length)],
          description: data.description,
          location: "Nairobi",
          type: "Apartment",
          bedrooms: Math.floor(Math.random() * 4) + 1,
          bathrooms: Math.floor(Math.random() * 3) + 1,
        });

      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  if (loading) {
    return (
      <div className="p-6 text-center text-gray-500">
        Loading property details...
      </div>
    );
  }

  if (!property) {
    return (
      <div className="p-6 text-center text-red-500">
        Property not found
      </div>
    );
  }

  return (
    <div className="p-10 max-w-4xl mx-auto">

      <img
        src={property.image}
        className="w-full h-80 object-cover rounded-xl"
      />

      <h1 className="text-3xl font-bold mt-6">
        {property.name}
      </h1>

      <p className="text-gray-600 mt-2">
        {property.description}
      </p>

      <div className="mt-4 text-gray-700">
        <p>📍 {property.location}</p>
        <p>🏠 {property.type}</p>
        <p>🛏 {property.bedrooms} Bedrooms • 🚿 {property.bathrooms} Bathrooms</p>
      </div>

      <p className="text-xl font-bold mt-4 text-blue-600">
        KES {property.price}
      </p>

    </div>
  );
}