import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";

// Create a simple ProductCard component for testing
const ProductCard = ({ product, onAddToCart }) => (
  <div data-testid="product-card">
    <h3>{product.title}</h3>
    <p>${product.price}</p>
    <button onClick={() => onAddToCart(product)}>Add to cart</button>
  </div>
);

describe("ProductCard Component", () => {
  const mockProduct = {
    id: 1,
    title: "Test Product",
    price: 19.99,
    image: "test.jpg",
  };

  it("renders product information correctly", () => {
    render(<ProductCard product={mockProduct} onAddToCart={vi.fn()} />);

    expect(screen.getByText("Test Product")).toBeInTheDocument();
    expect(screen.getByText("$19.99")).toBeInTheDocument();
  });

  it("calls onAddToCart when button is clicked", () => {
    const handleAddToCart = vi.fn();
    render(<ProductCard product={mockProduct} onAddToCart={handleAddToCart} />);

    const button = screen.getByText("Add to cart");
    fireEvent.click(button);

    expect(handleAddToCart).toHaveBeenCalledWith(mockProduct);
    expect(handleAddToCart).toHaveBeenCalledTimes(1);
  });
});
