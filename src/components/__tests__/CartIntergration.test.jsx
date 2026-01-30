import { describe, it, expect } from "vitest";
import { configureStore } from "@reduxjs/toolkit";
import cartReducer, { addToCart } from "../../store/cartSlice";

describe("Cart Integration Test", () => {
  it("updates cart count when product is added", () => {
    const store = configureStore({
      reducer: { cart: cartReducer },
    });

    // Initial state - cart should be empty
    expect(store.getState().cart.items.length).toBe(0);

    // Add first product to cart
    store.dispatch(
      addToCart({
        id: 1,
        title: "Test Product",
        price: 19.99,
        image: "test.jpg",
      }),
    );

    // Verify cart updated with one item
    let state = store.getState();
    expect(state.cart.items.length).toBe(1);
    expect(state.cart.items[0].quantity).toBe(1);
    expect(state.cart.items[0].title).toBe("Test Product");

    // Add same product again
    store.dispatch(
      addToCart({
        id: 1,
        title: "Test Product",
        price: 19.99,
        image: "test.jpg",
      }),
    );

    // Verify quantity increased (not a new item)
    state = store.getState();
    expect(state.cart.items.length).toBe(1);
    expect(state.cart.items[0].quantity).toBe(2);

    // Add different product
    store.dispatch(
      addToCart({
        id: 2,
        title: "Another Product",
        price: 29.99,
        image: "test2.jpg",
      }),
    );

    // Verify new item added
    state = store.getState();
    expect(state.cart.items.length).toBe(2);
  });
});
