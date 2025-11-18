import { Link } from "react-router-dom";
import { useContext } from "react";
import { CartContext } from "../../context/CartContext";

function NavBar() {
  const { totalItems } = useContext(CartContext);

  return (
    <nav className="navbar">
      <div className="nav-container">
        <Link className="logo" to="/">RemerasShop</Link>
        <ul className="nav-links">
          <li><Link to="/">Inicio</Link></li>
          <li><Link to="/cart">Carrito ({totalItems})</Link></li>
        </ul>
      </div>
    </nav>
  );
}

export default NavBar;
