import React from 'react';
import { useLocation } from 'react-router-dom';

const OrderDetails = () => {
  const { state } = useLocation();
  const order = state?.order;

  if (!order) {
    return <div>No order details available.</div>;
  }

  return (
    <div style={{ padding: '20px' }}>
      <h1>Order Details</h1>
      <p><strong>Order ID:</strong> {order._id}</p>
      <p><strong>Name:</strong> {order.name}</p>
      <p><strong>Total Cost:</strong> Rs. {order.totalCost}</p>
      <h2>Items:</h2>
      <ul>
        {order.cartItems.map((item, idx) => (
          <li key={idx}>
            <p><strong>Product:</strong> {item.name}</p>
            <p><strong>Quantity:</strong> {item.quantity}</p>
            <p><strong>Price:</strong> Rs. {item.price}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default OrderDetails;
