import { useSelector, useDispatch } from "react-redux";
import { removeFromCart, clearCart } from "../store/cartSlice";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase";
import { useAuth } from "../context/AuthContext";

const Cart = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);
  const total = useSelector((state) => state.cart.total);

  // Get the entire auth object first to debug
  const authData = useAuth();
  const currentUser = authData?.currentUser || authData;

  const handleCheckout = async () => {
    try {
      console.log("Checkout clicked!");
      console.log("authData:", authData);
      console.log("currentUser:", currentUser);

      if (!currentUser) {
        console.error("No currentUser found");
        alert("You must be logged in to checkout.");
        return;
      }

      console.log("currentUser.uid:", currentUser.uid);
      console.log("Checking out with items:", cartItems, "total:", total);

      const docRef = await addDoc(collection(db, "orders"), {
        userId: currentUser.uid,
        items: cartItems,
        total,
        createdAt: serverTimestamp(),
      });

      console.log("Order saved with ID:", docRef.id);
      alert("Order placed successfully!");
      dispatch(clearCart());
    } catch (err) {
      console.error("Checkout error:", err);
      alert("Checkout failed: " + err.message);
    }
  };

  if (!cartItems.length) {
    return <h2 className="page-title">Your cart is empty</h2>;
  }

  return (
    <div className="page">
      <h2 className="page-title">My Cart</h2>

      {/* list of items */}
      <ul className="cart-list">
        {cartItems.map((item) => (
          <li key={item.id} className="cart-item">
            <img src={item.image} alt={item.title} className="cart-image" />
            <div className="cart-info">
              <h3>{item.title}</h3>
              <p>Price: ${item.price.toFixed(2)}</p>
              <p>Qty: {item.quantity}</p>
              <p>Subtotal: ${(item.price * item.quantity).toFixed(2)}</p>
            </div>
            <button
              onClick={() => dispatch(removeFromCart(item.id))}
              className="btn btn-danger"
            >
              Remove
            </button>
          </li>
        ))}
      </ul>

      {/* total + checkout */}
      <div className="cart-summary">
        <h3>Total: ${total.toFixed(2)}</h3>
        <button onClick={handleCheckout} className="btn btn-primary">
          Checkout
        </button>
      </div>
    </div>
  );
};

export default Cart;
