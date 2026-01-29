import React, { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import {
  fetchAllProductsFirebase,
  createProductFirebase,
  updateProductFirebase,
  deleteProductFirebase,
} from "../api/firebaseProducts";

const ProductAdmin = () => {
  const queryClient = useQueryClient();

  const {
    data: products,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["admin-products"],
    queryFn: fetchAllProductsFirebase,
  });

  const [form, setForm] = useState({
    id: null,
    title: "",
    price: "",
    description: "",
    category: "",
    image: "",
  });

  const isEditing = Boolean(form.id);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const resetForm = () => {
    setForm({
      id: null,
      title: "",
      price: "",
      description: "",
      category: "",
      image: "",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const productData = {
      title: form.title,
      price: Number(form.price),
      description: form.description,
      category: form.category,
      image: form.image,
    };

    if (isEditing) {
      await updateProductFirebase(form.id, productData);
    } else {
      await createProductFirebase(productData);
    }

    resetForm();
    queryClient.invalidateQueries(["admin-products"]);
    queryClient.invalidateQueries(["products"]);
  };

  const handleEditClick = (product) => {
    setForm({
      id: product.id,
      title: product.title || "",
      price: product.price?.toString() || "",
      description: product.description || "",
      category: product.category || "",
      image: product.image || "",
    });
  };

  const handleDelete = async (id) => {
    const confirmed = window.confirm("Delete this product?");
    if (!confirmed) return;

    await deleteProductFirebase(id);
    queryClient.invalidateQueries(["admin-products"]);
    queryClient.invalidateQueries(["products"]);
  };

  if (isLoading) return <p>Loading products…</p>;
  if (error) return <p>Error loading products.</p>;

  return (
    <div className="product-admin-page">
      <h2>Product Management</h2>

      <form onSubmit={handleSubmit} className="product-admin-form">
        <h3>{isEditing ? "Edit Product" : "Add Product"}</h3>

        <label>
          Title
          <input
            name="title"
            value={form.title}
            onChange={handleChange}
            placeholder="Product title"
            required
          />
        </label>

        <label>
          Price
          <input
            name="price"
            type="number"
            step="0.01"
            value={form.price}
            onChange={handleChange}
            placeholder="Price"
            required
          />
        </label>

        <label>
          Category
          <input
            name="category"
            value={form.category}
            onChange={handleChange}
            placeholder="Category"
            required
          />
        </label>

        <label>
          Image URL
          <input
            name="image"
            value={form.image}
            onChange={handleChange}
            placeholder="Image URL"
          />
        </label>

        <label>
          Description
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            placeholder="Description"
          />
        </label>

        <div style={{ marginTop: "0.75rem" }}>
          <button type="submit">
            {isEditing ? "Update Product" : "Create Product"}
          </button>
          {isEditing && (
            <button
              type="button"
              onClick={resetForm}
              style={{ marginLeft: "0.5rem" }}
            >
              Cancel
            </button>
          )}
        </div>
      </form>

      <hr style={{ margin: "1.5rem 0" }} />

      <h3>Existing Products</h3>
      <ul className="product-admin-list">
        {products?.map((p) => (
          <li key={p.id} className="product-admin-item">
            <strong>{p.title}</strong> – ${p.price}
            <div>
              <button onClick={() => handleEditClick(p)}>Edit</button>
              <button
                onClick={() => handleDelete(p.id)}
                style={{ marginLeft: "0.5rem" }}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductAdmin;
