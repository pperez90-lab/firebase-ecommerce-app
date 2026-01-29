# Firebase E-Commerce App

A full-stack e-commerce application built with React and Firebase, featuring complete product management, user authentication, and order tracking capabilities.

## 🚀 Features

### Authentication & User Management
- **User Registration & Login**: Secure email/password authentication via Firebase Auth
- **User Profiles**: View and edit profile information (name, address)
- **Account Management**: Users can delete their accounts and associated data

### Product Management
- **Product Catalog**: Browse products with filtering by category
- **CRUD Operations**: Create, Read, Update, and Delete products (admin functionality)
- **Categories**: men's clothing, women's clothing, jewelery, electronics
- **Product Details**: Title, price, description, category, and image for each product

### Shopping Cart & Orders
- **Add to Cart**: Redux-powered cart with real-time item tracking
- **Checkout**: Place orders with all cart items saved to Firestore
- **Order History**: View past orders with complete details (items, prices, dates)
- **Order Details**: Click individual orders to see full product breakdown

## 🛠️ Tech Stack

- **Frontend**: React, Vite
- **State Management**: Redux Toolkit
- **Data Fetching**: React Query (TanStack Query)
- **Backend/Database**: Firebase (Firestore)
- **Authentication**: Firebase Authentication
- **Styling**: CSS

## 📦 Installation

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- Firebase account

### Setup Instructions

1. **Clone the repository**
   ```bash
   git clone https://github.com/pperez90-lab/firebase-ecommerce-app.git
   cd firebase-ecommerce-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure Firebase**
   - Create a Firebase project at [Firebase Console](https://console.firebase.google.com/)
   - Enable Firebase Authentication (Email/Password)
   - Create a Firestore Database
   - Copy your Firebase config

4. **Set up environment variables**
   
   Create a `.env` file in the root directory:
   ```env
   VITE_FIREBASE_API_KEY=your_api_key
   VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
   VITE_FIREBASE_PROJECT_ID=your_project_id
   VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
   VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
   VITE_FIREBASE_APP_ID=your_app_id
   ```

5. **Run the development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   
   Navigate to `http://localhost:5173`

## 🗄️ Firestore Structure

### Collections

**users**
```javascript
{
  uid: "user_id",
  email: "user@example.com",
  name: "John Doe",
  address: "123 Main St",
  createdAt: "2026-01-29T18:00:00.000Z"
}
```

**products**
```javascript
{
  id: "product_id",
  title: "Product Name",
  price: 19.99,
  description: "Product description",
  category: "electronics",
  image: "https://example.com/image.jpg"
}
```

**orders**
```javascript
{
  id: "order_id",
  userId: "user_id",
  items: [
    {
      id: "product_id",
      title: "Product Name",
      price: 19.99,
      quantity: 2,
      image: "https://example.com/image.jpg"
    }
  ],
  total: 39.98,
  createdAt: "2026-01-29T18:00:00.000Z"
}
```

## 🎯 Usage

### For Users
1. **Register/Login**: Create an account or log in
2. **Browse Products**: View all products or filter by category
3. **Add to Cart**: Click "Add to cart" on any product
4. **Checkout**: Navigate to cart and click "Checkout" to place order
5. **View Orders**: Click "Orders" to see your order history
6. **Manage Profile**: Update your name and address in the Profile section

### For Admins
1. **Manage Products**: Navigate to the Admin section
2. **Add Products**: Fill out the form with product details
3. **Edit Products**: Click "Edit" on any product to modify
4. **Delete Products**: Remove products from the catalog

## 📁 Project Structure

```
firebase-ecommerce-app/
├── src/
│   ├── api/
│   │   └── firebaseProducts.js    # Firestore product CRUD operations
│   ├── components/
│   │   ├── Cart.jsx               # Shopping cart component
│   │   ├── Header.jsx             # Navigation header
│   │   ├── Home.jsx               # Product listing page
│   │   ├── Login.jsx              # Login form
│   │   ├── OrderHistory.jsx       # Order history view
│   │   ├── ProductAdmin.jsx       # Admin product management
│   │   ├── Profile.jsx            # User profile management
│   │   └── Register.jsx           # Registration form
│   ├── context/
│   │   └── AuthContext.jsx        # Firebase auth context
│   ├── store/
│   │   ├── cartSlice.js           # Redux cart slice
│   │   └── store.js               # Redux store configuration
│   ├── firebase.js                # Firebase initialization
│   ├── App.jsx                    # Main app component
│   ├── main.jsx                   # App entry point
│   └── styles.css                 # Global styles
├── .env                           # Environment variables (not in repo)
├── .gitignore
├── package.json
├── vite.config.js
└── README.md
```

## 🔒 Security

- Firebase API keys are stored in environment variables
- Authentication required for checkout and order viewing
- Firestore security rules should be configured to protect user data
- Never commit `.env` file to version control

## 🚧 Future Enhancements

- [ ] Payment integration (Stripe/PayPal)
- [ ] Product search functionality
- [ ] Product reviews and ratings
- [ ] Wishlist feature
- [ ] Email notifications for orders
- [ ] Admin dashboard with analytics
- [ ] Image upload for products
- [ ] Inventory management

## 📝 License

This project is licensed under the MIT License.

## 👤 Author

**Peter Perez**
- GitHub: [@pperez90-lab](https://github.com/pperez90-lab)

## 🙏 Acknowledgments

- Built as part of Coding Temple's Full Stack Development program
- Firebase for backend infrastructure
- FakeStore API for initial product images

---

**Note**: This is a portfolio/educational project demonstrating Firebase integration with React.
