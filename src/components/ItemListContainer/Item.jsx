import { Link } from "react-router-dom";

function Item({ product }) {
  return (
    <div className="item-card">
      <img src={product.image} alt={product.name} />
      <h3>{product.name}</h3>
      <p>${product.price}</p>
      <Link to={`/item/${product.id}`}>
        <button>Ver detalle</button>
      </Link>
    </div>
  );
}

export default Item;
