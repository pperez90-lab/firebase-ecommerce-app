import { useSelector, useDispatch } from "react-redux";
import { removeFromCart, clearCart } from "../store/cartSlice";

function Cart() {
  const items = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();

  const totalCount = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = items
    .reduce((sum, item) => sum + item.price * item.quantity, 0)
    .toFixed(2);

  const handleCheckout = () => {
    dispatch(clearCart());
    sessionStorage.removeItem("cart");
    alert("Checkout complete! Your cart has been cleared.");
  };

  return (
    <div className="cart-root">
      <h2>Shopping Cart</h2>

      <div className="cart-summary">
        <span>Total items: {totalCount}</span>
        <span>Total price: ${totalPrice}</span>
      </div>

      {items.length === 0 && <p>Your cart is empty.</p>}

      <div className="cart-items">
        {items.map((item) => (
          <div key={item.id} className="cart-item">
            <img src={item.image} alt={item.title} />

            <div className="cart-item-main">
              <h4>{item.title}</h4>
              <p>Quantity: {item.quantity}</p>
            </div>

            <div className="cart-item-actions">
              <span className="cart-item-price">
                ${(item.price * item.quantity).toFixed(2)}
              </span>
              <button onClick={() => dispatch(removeFromCart(item.id))}>
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>

      {items.length > 0 && (
        <button className="cart-checkout-btn" onClick={handleCheckout}>
          Checkout
        </button>
      )}
    </div>
  );
}

export default Cart;
