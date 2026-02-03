import { useEffect, useState } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import { useAuth } from "../context/AuthContext";

const OrderHistory = () => {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      setLoading(false);
      return;
    }

    const fetchOrders = async () => {
      try {
        console.log("Fetching orders for user:", user.uid);

        const q = query(
          collection(db, "orders"),
          where("userId", "==", user.uid),
        );

        const snap = await getDocs(q);
        console.log("Orders fetched:", snap.size);

        const data = snap.docs.map((doc) => {
          return { id: doc.id, ...doc.data() };
        });

        // Sort manually by createdAt descending
        data.sort((a, b) => {
          const aTime = a.createdAt?.toMillis?.() || 0;
          const bTime = b.createdAt?.toMillis?.() || 0;
          return bTime - aTime;
        });

        setOrders(data);
      } catch (err) {
        console.error("Error fetching orders:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [user]);

  if (loading) {
    return (
      <div className="page">
        <h2 className="page-title">My Orders</h2>
        <p>Loading orders...</p>
      </div>
    );
  }

  if (!orders.length) {
    return (
      <div className="page">
        <h2 className="page-title">My Orders</h2>
        <p>No orders yet. Start shopping!</p>
      </div>
    );
  }

  return (
    <div className="page">
      <h2 className="page-title">My Orders</h2>

      {orders.map((order) => (
        <div key={order.id} className="order-card">
          <h3>Order #{order.id.substring(0, 8)}</h3>
          <p>
            <strong>Total: ${order.total?.toFixed(2)}</strong>
            {order.createdAt && (
              <> • {order.createdAt.toDate().toLocaleString()}</>
            )}
          </p>

          <ul className="order-items">
            {order.items?.map((item, index) => (
              <li key={item.id || index} className="order-item">
                <span>{item.title}</span>
                <span>Qty: {item.quantity}</span>
                <span>${(item.price * item.quantity).toFixed(2)}</span>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default OrderHistory;
