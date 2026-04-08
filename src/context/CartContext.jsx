import { createContext, useContext, useEffect, useState } from "react";
import {
  fetchCart,
  addItemToCart,
  removeCartItem,
  clearCartItems,
  updateCartItem,
  checkoutCart

} from "../Services/cartService";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [cartTotal, setCartTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Load Cart
  const loadCart = async () => {
    try {
      setLoading(true);
      const { data } = await fetchCart();

      setCartItems(data.items);
      setCartTotal(data.cartTotal);
      setError(null);
    } catch (err) {
      setError("Failed to load cart");
    } finally {
      setLoading(false);
    }
  };

  // Add Item
  const addToCart = async (payload) => {
    try {
      setLoading(true);
      const { data } = await addItemToCart(payload);
      setCartItems(data.items);
      setCartTotal(data.cartTotal);
    } catch (err) {
      setError("Failed to add item");
    } finally {
      setLoading(false);
    }
  };

  // Update Quantity
  const updateQuantity = async (cartItemId, quantity) => {
    try {
      setLoading(true);
      const { data } = await updateCartItem(cartItemId, quantity);
      setCartItems(data.items);
      setCartTotal(data.cartTotal);
    } catch (err) {
      setError("Failed to update item");
    } finally {
      setLoading(false);
    }
  };

  // Remove Item
  const removeItem = async (cartItemId) => {
    try {
      setLoading(true);
      const { data } = await removeCartItem(cartItemId);
      setCartItems(data.items);
      setCartTotal(data.cartTotal);
    } catch (err) {
      setError("Failed to remove item");
    } finally {
      setLoading(false);
    }
  };

  // Clear Cart
  const clearCart = async () => {
    try {
      setLoading(true);
      await clearCartItems();
      setCartItems([]);
      setCartTotal(0);
    } catch (err) {
      setError("Failed to clear cart");
    } finally {
      setLoading(false);
    }
  };
  // Checkout
   const checkout = async (orderData) => {
    try {
      setLoading(true);
      const res = await checkoutCart(orderData);
      setCartItems([]);
      setCartTotal(0);
      return res.data;
    } catch (err) {
      setError("Failed to checkout");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    loadCart();
  }, []);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        cartTotal,
        loading,
        error,
        loadCart,
        addToCart,
        updateQuantity,
        removeItem,
        clearCart,
        checkout,
    }}
    >
      {children}
    </CartContext.Provider>
  );
};

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within CartProvider");
  }
  return context;
}