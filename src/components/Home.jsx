import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  fetchAllProductsFirebase,
  fetchProductsByCategoryFirebase,
} from "../api/firebaseProducts";
import { useDispatch } from "react-redux";
import { addToCart } from "../store/cartSlice";

const Home = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const dispatch = useDispatch();

  const categories = [
    "all",
    "men's clothing",
    "women's clothing",
    "jewelery",
    "electronics",
  ];

  const {
    data: products,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["products", selectedCategory],
    queryFn: () =>
      selectedCategory === "all"
        ? fetchAllProductsFirebase()
        : fetchProductsByCategoryFirebase(selectedCategory),
  });

  const handleAddToCart = (product) => {
    dispatch(
      addToCart({
        id: product.id,
        title: product.title,
        price: product.price,
        image: product.image,
      }),
    );
  };

  return (
    <div className="home-page">
      <div className="home-controls">
        <h2>Products</h2>

        <label>
          Category:
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat === "all" ? "All" : cat}
              </option>
            ))}
          </select>
        </label>
      </div>

      {isLoading && <p>Loading products…</p>}
      {error && <p>Failed to load products.</p>}

      <div className="products-grid">
        {products?.map((product) => (
          <div key={product.id} className="product-card">
            {product.image && (
              <img
                src={product.image}
                alt={product.title}
                className="product-image"
              />
            )}
            <h3 className="product-title">{product.title}</h3>
            <p className="product-price">${product.price}</p>
            <p className="product-description">
              {product.description?.slice(0, 80)}…
            </p>
            <button onClick={() => handleAddToCart(product)}>
              Add to cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
