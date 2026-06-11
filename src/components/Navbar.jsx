import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav>
      <h2>Pangisha</h2>

      <Link to="/">Home</Link> |{" "}
      <Link to="/properties">Properties</Link> |{" "}
      <Link to="/favorites">Favorites</Link>
    </nav>
  );
}