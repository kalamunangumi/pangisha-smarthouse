export async function fetchProperties() {
  const response = await fetch("https://dummyjson.com/products");

  if (!response.ok) {
    throw new Error("Failed to fetch properties");
  }

  const data = await response.json();

  const houseImages = [
  "https://images.unsplash.com/photo-1568605114967-8130f3a36994",
  "https://images.unsplash.com/photo-1570129477492-45c003edd2be",
  "https://images.unsplash.com/photo-1600585154340-be6161a56a0c",
  "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9",
  ];

  return data.products.map((item) => ({
    id: item.id,
    name: item.title,
    price: item.price * 100,
    image: houseImages[Math.floor(Math.random() * houseImages.length)],
    type: "Apartment",
    location: "Nairobi",
    bedrooms: Math.floor(Math.random() * 4) + 1,
    bathrooms: Math.floor(Math.random() * 3) + 1,
  }));
}