import { useQuery } from "@tanstack/react-query";
import {
  fetchCategories,
  fetchAllProducts,
  fetchProductsByCategory,
} from "../api/products";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "../store/cartSlice";

function Home() {
  const dispatch = useDispatch();
  const [selectedCategory, setSelectedCategory] = useState("all");

  const { data: categories, isLoading: categoriesLoading } = useQuery({
    queryKey: ["categories"],
    queryFn: fetchCategories,
  });

  const { data: products, isLoading: productsLoading } = useQuery({
    queryKey: ["products", selectedCategory],
    queryFn: () =>
      selectedCategory === "all"
        ? fetchAllProducts()
        : fetchProductsByCategory(selectedCategory),
  });

  if (categoriesLoading || productsLoading) return <p>Loading...</p>;

  return (
    <div>
      <div className="home-header">
        <h2 className="home-title">FakeStore Shop</h2>

        <div className="home-filter">
          <label>
            Filter by category:{" "}
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              <option value="all">All</option>
              {categories?.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </label>
        </div>
      </div>

      <div className="products-grid">
        {products?.map((product) => (
          <div key={product.id} className="product-card">
            <img
              src={product.image}
              alt={product.title}
              onError={(e) => {
                e.currentTarget.src = "https://via.placeholder.com/150";
              }}
            />
            <h3>{product.title}</h3>
            <p className="product-meta">{product.category}</p>

            <div className="product-price-rating">
              <span className="product-price">${product.price}</span>
              <span className="product-rating">
                ⭐ {product.rating?.rate ?? "N/A"}
              </span>
            </div>

            <p className="product-description">{product.description}</p>

            <button onClick={() => dispatch(addToCart(product))}>
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
