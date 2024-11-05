import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem, updateQuantity } from './CartSlice';
import './CartItem.css';

const CartItem = ({ onContinueShopping }) => {
  const cart = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();

  // Calculate the total cost of all items in the cart
  const calculateTotalAmount = () => {
    return cart.reduce((total, item) => {
      const itemCost = parseFloat(item.cost) || 0;
      const itemQuantity = parseInt(item.quantity) || 0;
      return total + itemCost * itemQuantity;
    }, 0).toFixed(2);
  };

  // Calculate subtotal for a single item based on quantity
  const calculateTotalCost = (item) => {
    const itemCost = parseFloat(item.cost) || 0;
    const itemQuantity = parseInt(item.quantity) || 0;
    return (itemCost * itemQuantity).toFixed(2);
  };

  // Continue shopping functionality
  const handleContinueShopping = (e) => {
    e.preventDefault();
    if (onContinueShopping) {
      onContinueShopping(); // Trigger parent-provided navigation function
    } else {
      console.warn("No onContinueShopping function provided!");
    }
  };

  // Checkout functionality placeholder
  const handleCheckoutShopping = (e) => {
    e.preventDefault();
    alert('Checkout functionality will be added later.');
  };

  // Increase item quantity
  const handleIncrement = (item) => {
    const newQuantity = item.quantity + 1;
    dispatch(updateQuantity({ name: item.name, quantity: newQuantity }));
  };

  // Decrease item quantity or remove if quantity reaches 0
  const handleDecrement = (item) => {
    if (item.quantity === 1) {
      dispatch(removeItem(item.name));
    } else {
      const newQuantity = item.quantity - 1;
      dispatch(updateQuantity({ name: item.name, quantity: newQuantity }));
    }
  };

  // Remove an item from the cart
  const handleRemove = (item) => {
    dispatch(removeItem(item.name));
  };

  return (
    <div className="cart-container">
      <h2 style={{ color: 'black' }}>Total Cart Amount: ${calculateTotalAmount()}</h2>
      <div>
        {cart.map((item) => (
          <div className="cart-item" key={item.name}>
            <img className="cart-item-image" src={item.image} alt={item.name} />
            <div className="cart-item-details">
              <div className="cart-item-name">{item.name}</div>
              <div className="cart-item-cost">Cost: ${item.cost}</div>
              <div className="cart-item-quantity">
                <button className="cart-item-button cart-item-button-dec" onClick={() => handleDecrement(item)}>-</button>
                <span className="cart-item-quantity-value">{item.quantity}</span>
                <button className="cart-item-button cart-item-button-inc" onClick={() => handleIncrement(item)}>+</button>
              </div>
              <div className="cart-item-total">Subtotal: ${calculateTotalCost(item)}</div>
              <button className="cart-item-delete" onClick={() => handleRemove(item)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
      <div className="continue_shopping_btn">
        <button className="get-started-button" onClick={handleContinueShopping}>
          Continue Shopping
        </button>
        <br />
        <button className="get-started-button1" onClick={handleCheckoutShopping}>
          Checkout
        </button>
      </div>
    </div>
  );
};

export default CartItem;


