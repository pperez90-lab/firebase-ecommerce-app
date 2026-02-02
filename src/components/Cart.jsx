import { useSelector, useDispatch } from "react-redux";
import { removeFromCart, clearCart } from "../store/cartSlice";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase";
import { useAuth } from "../context/AuthContext";

const Cart = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);
  const total = useSelector((state) => state.cart.total);
  const { currentUser } = useAuth();

  const handleCheckout = async () => {
    if (!currentUser) return;

    // save order to Firestore
    await addDoc(collection(db, "orders"), {
      userId: currentUser.uid,
      items: cartItems,
      total,
      createdAt: serverTimestamp(),
    });

    dispatch(clearCart());
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
