//changed navbar slightly to include the new features
import { Link } from "react-router-dom";
export default function NavBar({ username, isAdmin, handleLogout, handleAddNewProduct, quantity }) {
  let addNewProductButton = null;
  if (isAdmin) {
    addNewProductButton = (<button onClick={handleAddNewProduct}>Add New Product</button>);
  }
  return (
    <nav className="NavBar">
      <div className="NavDiv NavUser">
        <h3>Hello, {username}</h3>
        <button onClick={handleLogout}>Logout</button>
        {addNewProductButton}
      </div>
      <div className="NavDiv NavTitle">
        <h2>Groceries App 🍎</h2>
      </div>
      <Link to="/">Login</Link>
      <div className="NavDiv NavCart">
        <img
          src={
            quantity > 0
              ? "src/assets/cart-full.png"
              : "src/assets/cart-empty.png"
          }
        />
      </div>
    </nav>
  );
}
