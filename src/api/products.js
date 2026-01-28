// src/api/products.js
const BASE_URL = "https://fakestoreapi.com";

// get ALL products
export const fetchAllProducts = async () => {
  const res = await fetch(`${BASE_URL}/products`);
  if (!res.ok) throw new Error("Failed to fetch products");
  return res.json();
};

// get ALL categories
export const fetchCategories = async () => {
  const res = await fetch(`${BASE_URL}/products/categories`);
  if (!res.ok) throw new Error("Failed to fetch categories");
  return res.json();
};

// get products BY category
export const fetchProductsByCategory = async (category) => {
  const res = await fetch(`${BASE_URL}/products/category/${category}`);
  if (!res.ok) throw new Error("Failed to fetch category products");
  return res.json();
};
