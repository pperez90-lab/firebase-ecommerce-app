// src/App.jsx
import { useState } from "react";
import { useSelector } from "react-redux";
import Home from "./components/Home.jsx";
import Cart from "./components/Cart.jsx";

function App() {
  // Track which view is active: "home" or "cart"
  const [page, setPage] = useState("home");

  // Get cart items from Redux to show total items in header
  const items = useSelector((state) => state.cart.items || []);
  const totalCount = items.reduce((sum, item) => sum + (item.quantity || 0), 0);

  return (
    <div className="app-root">
      <header className="app-header">
        <h1>FakeStore Shop Project</h1>

        <nav className="app-nav">
          <button onClick={() => setPage("home")}>Home</button>
          <button onClick={() => setPage("cart")}>Cart ({totalCount})</button>
        </nav>
      </header>

      <main className="app-main">
        {page === "home" && <Home />}
        {page === "cart" && <Cart />}
      </main>
    </div>
  );
}

export default App;
