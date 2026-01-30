import React, { useState } from "react";
import Home from "./components/Home.jsx";
import Cart from "./components/Cart.jsx";
import Header from "./components/Header.jsx";
import Login from "./components/Login.jsx";
import Register from "./components/Register.jsx";
import Profile from "./components/Profile.jsx";
import OrderHistory from "./components/OrderHistory.jsx";
import ProductAdmin from "./components/ProductAdmin.jsx";

function App() {
  // Track which view is active
  const [page, setPage] = useState("home");

  const renderPage = () => {
    switch (page) {
      case "home":
        return <Home />;
      case "cart":
        return <Cart />;
      case "login":
        return <Login />;
      case "register":
        return <Register />;
      case "profile":
        return <Profile />;
      case "orders":
        return <OrderHistory />;
      case "admin":
        return <ProductAdmin />;
      default:
        return <Home />;
    }
  };

  return (
    <div className="app-root">
      {/* Header gets page switcher */}
      <Header onNavigate={setPage} />

      <main className="app-main">{renderPage()}</main>
    </div>
  );
}

export default App;
