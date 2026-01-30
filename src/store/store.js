import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // uses localStorage
import cartReducer from "./cartSlice";

// Persist configuration
const persistConfig = {
  key: "root",
  storage,
  whitelist: ["cart"], // only persist the cart slice
};

// Create persisted reducer
const persistedCartReducer = persistReducer(persistConfig, cartReducer);

// Configure store with persisted reducer
export const store = configureStore({
  reducer: {
    cart: persistedCartReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore redux-persist actions
        ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"],
      },
    }),
});

// Create persistor
export const persistor = persistStore(store);
