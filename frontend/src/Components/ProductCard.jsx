import QuantityCounter from "./QuantityCounter";
import { useNavigate } from "react-router-dom";
//also changed this slightly to add the buttons needed for admin users only
export default function ProductCard({
  productName,
  brand,
  image,
  price,
  productQuantity,
  handleAddQuantity,
  handleRemoveQuantity,
  handleAddToCart,
  id,
  handleEditProduct,
  _id,
  handleDeleteProduct,
  isAdmin
}) {
  const navigate = useNavigate();

  let editButton = null;
  let deleteButton = null;

  if(isAdmin) {
    editButton = (<button id="edit-button" onClick={() => navigate("/edit-product", {state: {_id}}) }>Edit</button>)
  }
  if(isAdmin) {
    deleteButton = (<button className="RemoveButton" onClick={() => handleDeleteProduct(_id)}>Delete</button>)
  }
  return (
    <div className="ProductCard">
      <h3>{productName}</h3>
      <img src={image} alt="" />
      <h4>{brand}</h4>
      <QuantityCounter
        handleAddQuantity={handleAddQuantity}
        productQuantity={productQuantity}
        handleRemoveQuantity={handleRemoveQuantity}
        id={id}
        mode="product"
      />
      <h3>{price}</h3>
      <button onClick={() => handleAddToCart(id)}>Add to Cart</button>
      {editButton}
      {deleteButton}
    </div>
  );
}
