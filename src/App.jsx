import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Properties from "./pages/Properties";
import PropertyDetails from "./pages/PropertyDetails";
import Favorites from "./pages/Favorites";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/properties" element={<Properties />} />
      <Route path="/property/:id" element={<PropertyDetails />} />
      <Route path="/favorites" element={<Favorites />} />
    </Routes>
  );
}

export default App;
