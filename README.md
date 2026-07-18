# Dibitech - E-Commerce React Application (Frontend)

A modern, high-performance, and visually stunning e-commerce frontend built with React, Vite, and Material-UI (MUI). It features an elegant user interface, sophisticated micro-animations, and full integration with a robust Laravel REST API backend.

## ✨ Key Features

*   **Modern Premium UI/UX:**
    *   Beautiful, scalable product grid and responsive layouts.
    *   Custom CSS keyframe micro-animations (e.g., Heartburst and Ripple Ring effects for the wishlist).
    *   Sleek Material-UI (MUI) integration customized with a professional color palette.
*   **Role-Based Dashboards:**
    *   **Admin Dashboard:** High-level overview of users, products, categories, and real-time system statistics.
    *   **Seller Dashboard:** Secure product management (Create, Read, Update, Delete) and order tracking.
    *   **Buyer Experience:** Intuitive catalog browsing, interactive Cart management, and seamless Wishlist.
*   **Advanced State Management (Context API):**
    *   `AuthContext`: Global user authentication, role management, and session handling.
    *   `CartContext`: Real-time cart synchronization and checkout logic.
    *   `WishlistContext`: Optimistic UI updates for instant, zero-delay favorite toggling.
*   **Optimized Performance & DRY Principles:**
    *   Built with Vite for blazing-fast Hot Module Replacement (HMR) and optimized production builds.
    *   Custom Hooks (`useFetch`, `useMutation`, `useSearch`) abstracting complex data fetching logic.
    *   Axios Interceptors for automatic bearer token injection and centralized error handling.

## 🛠️ Technology Stack

*   **Core:** React 18, Vite
*   **Routing:** React Router v6
*   **UI/Styling:** Material-UI (MUI), Emotion, Custom Vanilla CSS Keyframes
*   **State Management:** React Context API
*   **HTTP Client:** Axios

## 📦 Installation & Local Development

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/WisnuCodes/react-laravel-api-integration.git
    cd react-laravel-api-integration
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Environment Variables:**
    Create a `.env` file in the root directory (or use `.env.production` for production).
    ```env
    VITE_API_URL=http://localhost:8000/api
    ```

4.  **Run Development Server:**
    ```bash
    npm run dev
    ```
    *The app will be accessible at `http://localhost:5173`.*

> **Note:** Ensure the backend API (Laravel) is running locally at `http://localhost:8000` to fetch real data.

## 📁 Project Structure Highlights

*   `src/api/client.js` - Global Axios instance with automatic token interceptors.
*   `src/components/` - Structured using Atomic Design principles (`atoms/`, `molecules/`, `organisms/`).
*   `src/context/` - Global context providers (`AuthContext.jsx`, `CartContext.jsx`, `WishlistContext.jsx`).
*   `src/hooks/` - Reusable custom hooks for declarative API interactions.
*   `src/pages/` - Role-specific page components (AdminDashboard, Cart, Landing, Products, etc.).
*   `src/App.css` - Custom premium animations and utility classes.

---
**Author:** Wisnu Nugraha
