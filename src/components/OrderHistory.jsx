import { useAuth } from "../context/AuthContext";
import { db } from "../firebase";
import { collection, query, where, getDocs, orderBy } from "firebase/firestore";
import { useEffect, useState } from "react";

const OrderHistory = () => {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);

  useEffect(() => {
    const loadOrders = async () => {
      if (!user) return;
      const ordersCol = collection(db, "orders");
      const q = query(
        ordersCol,
        where("userId", "==", user.uid),
        orderBy("createdAt", "desc"),
      );
      const snapshot = await getDocs(q);
      const data = snapshot.docs.map((d) => ({ id: d.id, ...d.data() }));
      setOrders(data);
    };
    loadOrders();
  }, [user]);

  if (!user) return <p>Please log in to view your order history.</p>;

  return (
    <div>
      <h2>My Orders</h2>
      <ul>
        {orders.map((order) => (
          <li
            key={order.id}
            onClick={() => setSelectedOrder(order)}
            style={{ cursor: "pointer" }}
          >
            <strong>{order.id}</strong> –{" "}
            {new Date(order.createdAt).toLocaleString()} – Total:{" "}
            {order.total.toFixed(2)}
          </li>
        ))}
      </ul>

      {selectedOrder && (
        <div>
          <h3>Order Details</h3>
          <p>ID: {selectedOrder.id}</p>
          <p>Date: {new Date(selectedOrder.createdAt).toLocaleString()}</p>
          <p>Total: {selectedOrder.total.toFixed(2)}</p>
          <ul>
            {selectedOrder.items.map((item) => (
              <li key={item.id}>
                {item.title} x {item.quantity} – {item.price}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default OrderHistory;
