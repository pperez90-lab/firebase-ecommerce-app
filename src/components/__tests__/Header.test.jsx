import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import Header from "../Header";
import cartReducer from "../../store/cartSlice";

// Mock AuthContext
vi.mock("../../context/AuthContext", () => ({
  useAuth: () => ({ user: null, authLoading: false }),
}));

const createMockStore = (initialState = {}) => {
  return configureStore({
    reducer: {
      cart: cartReducer,
    },
    preloadedState: initialState,
  });
};

describe("Header Component", () => {
  it("renders the app title", () => {
    const store = createMockStore({ cart: { items: [] } });
    render(
      <Provider store={store}>
        <Header onNavigate={vi.fn()} />
      </Provider>,
    );

    expect(screen.getByText(/FakeStore Shop Project/i)).toBeInTheDocument();
  });

  it("displays the correct cart count", () => {
    const store = createMockStore({
      cart: {
        items: [
          { id: 1, quantity: 2 },
          { id: 2, quantity: 3 },
        ],
      },
    });

    render(
      <Provider store={store}>
        <Header onNavigate={vi.fn()} />
      </Provider>,
    );

    expect(screen.getByText(/Cart \(5\)/i)).toBeInTheDocument();
  });
});
