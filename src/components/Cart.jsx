import { useSelector, useDispatch } from "react-redux";
import { clearCart } from "../store/cartSlice";
import { db } from "../firebase";
import { collection, addDoc } from "firebase/firestore";
import { useAuth } from "../context/AuthContext";

const Cart = () => {
  const items = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();
  const { user } = useAuth();

  const total = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  const handleCheckout = async () => {
    if (!user) {
      alert("Please log in to place an order");
      return;
    }
    if (!items.length) return;

    const ordersCol = collection(db, "orders");
    await addDoc(ordersCol, {
      userId: user.uid,
      items,
      total,
      createdAt: new Date().toISOString(),
    });

    dispatch(clearCart());
    alert("Order placed!");
  };

  // ...render cart items and total, plus Checkout button
  return (
    <div>
      {/* existing cart UI */}
      <p>Total: {total.toFixed(2)}</p>
      <button onClick={handleCheckout}>Checkout</button>
    </div>
  );
};

export default Cart;
