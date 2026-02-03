import { useEffect, useState } from "react";
import { collection, query, where, orderBy, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import { useAuth } from "../context/AuthContext";

const OrderHistory = () => {
  const authData = useAuth();
  const currentUser = authData?.currentUser || authData;
  const userId = currentUser?.uid || currentUser?.user?.uid || currentUser?.id;

  const [orders, setOrders] = useState([]);

  useEffect(() => {
    if (!currentUser || !userId) return;

    const fetchOrders = async () => {
      try {
        const q = query(
          collection(db, "orders"),
          where("userId", "==", userId),
          orderBy("createdAt", "desc"),
        );
        const snap = await getDocs(q);
        const data = snap.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        setOrders(data);
      } catch (err) {
        console.error("Error fetching orders:", err);
      }
    };

    fetchOrders();
  }, [currentUser, userId]);

  if (!orders.length) {
    return <h2 className="page-title">No orders yet</h2>;
  }

  return (
    <div className="page">
      <h2 className="page-title">My Orders</h2>

      {orders.map((order) => (
        <div key={order.id} className="order-card">
          <h3>Order #{order.id}</h3>
          <p>
            Total: ${order.total?.toFixed(2)} •{" "}
            {order.createdAt?.toDate().toLocaleString()}
          </p>

          <ul className="order-items">
            {order.items?.map((item) => (
              <li key={item.id} className="order-item">
                <span>{item.title}</span>
                <span>Qty: {item.quantity}</span>
                <span>${item.price.toFixed(2)}</span>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default OrderHistory;
