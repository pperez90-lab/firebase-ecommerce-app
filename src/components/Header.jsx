import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { useAuth } from "../context/AuthContext";
import { useSelector } from "react-redux";

const Header = ({ onNavigate }) => {
  const { user } = useAuth();
  const items = useSelector((state) => state.cart.items || []);
  const totalCount = items.reduce((sum, item) => sum + (item.quantity || 0), 0);

  const handleLogout = async () => {
    await signOut(auth);
  };

  return (
    <header className="app-header">
      <h1>FakeStore Shop Project</h1>

      <nav className="app-nav">
        <button onClick={() => onNavigate("home")}>Home</button>
        <button onClick={() => onNavigate("cart")}>Cart ({totalCount})</button>

        {user ? (
          <>
            <button onClick={() => onNavigate("orders")}>Orders</button>
            <button onClick={() => onNavigate("profile")}>Profile</button>
            <span>Welcome, {user.email}</span>
            <button onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <>
            <button onClick={() => onNavigate("login")}>Login</button>
            <button onClick={() => onNavigate("register")}>Register</button>
          </>
        )}
      </nav>
    </header>
  );
};

export default Header;
