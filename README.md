# FakeStore E-Commerce Application

## 📋 Project Overview

A modern, fully-functional e-commerce web application built with React that demonstrates advanced state management and data fetching patterns. This project utilizes the FakeStore API to simulate a real-world online shopping experience with product browsing, category filtering, cart management, and checkout functionality.

**Live Demo:** [Your deployed link here]

---

## ✨ Features

### Product Catalog
- **Dynamic Product Display**: Fetches and displays all products from the FakeStore API
- **Product Information**: Shows title, price, category, description, rating, and images for each product
- **Image Fallback**: Gracefully handles broken image URLs with placeholder images
- **Add to Cart**: Quick add-to-cart functionality directly from the product listing

### Category Navigation
- **Dynamic Category Dropdown**: Categories are fetched from the API (not hardcoded)
- **Smart Filtering**: Filter products by category with real-time updates
- **All Products View**: Option to view all products across all categories

### Shopping Cart
- **Redux State Management**: Cart state managed with Redux Toolkit
- **Session Persistence**: Cart data persists across page refreshes using sessionStorage
- **Item Management**: Add, remove, and view cart items
- **Live Updates**: Real-time cart count display in navigation
- **Price Calculation**: Automatic total price and item count calculation

### Checkout
- **Simulated Checkout**: Complete checkout flow (no real payment processing)
- **Cart Clearing**: Clears both Redux state and sessionStorage on checkout
- **User Feedback**: Visual confirmation upon successful checkout

---

## 🛠️ Tech Stack

- **React** (v18+) - UI library
- **Vite** - Build tool and dev server
- **Redux Toolkit** - State management for shopping cart
- **React Query (TanStack Query)** - Data fetching and caching
- **FakeStore API** - Mock e-commerce data
- **CSS3** - Custom styling
- **sessionStorage** - Cart persistence

---

## 🚀 Installation & Setup

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Steps

1. **Clone the repository**
   ```bash
   git clone https://github.com/pperez90-lab/fakestore-ecommerce-app.git
   cd fakestore-ecommerce-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open in browser**
   - Navigate to `http://localhost:5173` (or the port shown in terminal)

---

## 📂 Project Structure

```
fakestore-ecommerce-app/
├── src/
│   ├── api/
│   │   └── products.js          # API functions for FakeStore API
│   ├── components/
│   │   ├── Home.jsx              # Product listing & category filter
│   │   └── Cart.jsx              # Shopping cart page
│   ├── store/
│   │   ├── store.js              # Redux store configuration
│   │   └── cartSlice.js          # Cart state & reducers
│   ├── App.jsx                   # Main app component & routing
│   ├── main.jsx                  # App entry point
│   └── styles.css                # Global styles
├── public/
├── .gitignore
├── package.json
└── README.md
```

---

## 🌐 API Information

This project uses the **FakeStore API** to fetch product data:

- **Base URL**: `https://fakestoreapi.com`
- **Endpoints Used**:
  - `GET /products` - Fetch all products
  - `GET /products/categories` - Fetch all categories
  - `GET /products/category/{category}` - Fetch products by category

**Note**: Some product images from the API may return 404 errors. The app includes fallback handling to display placeholder images when this occurs.

---

## 🎓 Learning Objectives Demonstrated

This project was built to demonstrate proficiency in:

✅ **React Query (TanStack Query)** for efficient data fetching and caching  
✅ **Redux Toolkit** for centralized state management  
✅ **Asynchronous data handling** with modern async/await patterns  
✅ **API integration** with RESTful services  
✅ **Session persistence** using browser storage APIs  
✅ **Component composition** and React best practices  
✅ **Error handling** for network requests and broken resources  
✅ **State synchronization** between Redux and sessionStorage  
✅ **Dynamic UI updates** based on state changes  

---

## 🎯 Key Features Explained

### How React Query is Used
- Fetches product and category data from the API
- Automatically caches responses to reduce unnecessary network calls
- Handles loading and error states
- Re-fetches data when category selection changes

### How Redux Toolkit is Used
- Manages cart items (add, remove, clear)
- Provides a single source of truth for cart state
- Actions and reducers defined with `createSlice`
- Integrates with sessionStorage for persistence

### Session Persistence Strategy
- Cart state is saved to `sessionStorage` on every Redux state change
- On app initialization, cart is loaded from `sessionStorage` if available
- Checkout clears both Redux state and sessionStorage

---

## 🖥️ Usage

1. **Browse Products**: View all products on the home page
2. **Filter by Category**: Use the dropdown to filter products by category
3. **Add to Cart**: Click "Add to Cart" on any product
4. **View Cart**: Click the "Cart" button in the navigation (shows item count)
5. **Manage Cart**: Remove items or adjust quantities in the cart page
6. **Checkout**: Click the "Checkout" button to complete your purchase

---

## 🐛 Known Issues & Limitations

- **Image 404s**: Some FakeStore API images are no longer available; fallback placeholders are used
- **No Real Payment**: Checkout is simulated (no actual payment processing)
- **No User Authentication**: No login/logout functionality
- **Session-Only Persistence**: Cart data is cleared when the browser session ends

---

## 📝 Future Enhancements

- Add product search functionality
- Implement quantity adjustment in cart
- Add product detail pages
- Integrate a real payment gateway
- Add user authentication and order history
- Deploy to production (Vercel/Netlify)

---

## 👨‍💻 Author

**Your Name**  
- GitHub: [@pperez90-lab](https://github.com/pperez90-lab)
- Project: Coding Bootcamp Module Project

---

## 📄 License

This project is open source and available for educational purposes.

---

## 🙏 Acknowledgments

- [FakeStore API](https://fakestoreapi.com/) for providing the mock e-commerce data
- React, Redux Toolkit, and React Query documentation
- Coding bootcamp instructors and peers
