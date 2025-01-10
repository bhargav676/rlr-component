import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [updatingOrderId, setUpdatingOrderId] = useState(null); 
  const navigate = useNavigate(); 

  useEffect(() => {
    axios
      .get('http://127.0.0.1:4000/getorders')
      .then((res) => {
        setLoading(false);
        setOrders(res.data.reverse()); 
      })
      .catch((err) => {
        console.error('Error fetching orders:', err);
        setError('Failed to fetch orders');
        setLoading(false);
      });
  }, []);

  const handleStatusChange = (orderId, status) => {
    setUpdatingOrderId(orderId); 
    axios
      .put(`http://127.0.0.1:4000/update-order-status/${orderId}`, { status })
      .then((res) => {
        setOrders((prevOrders) =>
          prevOrders.map((order) =>
            order._id === orderId ? { ...order, status: status } : order
          )
        );
        setUpdatingOrderId(null); 
      })
      .catch((err) => {
        console.error('Error updating order status:', err);
        setError('Failed to update order status');
        setUpdatingOrderId(null); 
      });
  };

  const handleOrderClick = (order) => {
    navigate(`/order/${order._id}`, { state: { order } });
  };

  const filteredOrders = orders.filter((order) => {
    if (statusFilter === 'All') return true;
    return order.status === statusFilter;
  });

  if (loading) {
    return <div style={{ textAlign: 'center', fontSize: '1.5rem', color: 'gray' }}>Loading...</div>;
  }

  if (error) {
    return <div style={{ textAlign: 'center', color: 'red', fontSize: '1.2rem' }}>{error}</div>;
  }

  return (
    <div style={{ padding: '20px', backgroundColor: '#f8f8f8', minHeight: '100vh' }}>
      <h1 style={{ fontSize: '2rem', fontWeight: 'bold', textAlign: 'center', marginBottom: '20px' }}>
        My Orders
      </h1>
      <div style={{ marginBottom: '20px', textAlign: 'center' }}>
        <select
          onChange={(e) => setStatusFilter(e.target.value)}
          style={{ padding: '8px', borderRadius: '4px', fontSize: '1rem' }}
        >
          <option value="All">All Orders</option>
          <option value="Pending">Pending</option>
          <option value="Shipped">Shipped</option>
          <option value="Delivered">Delivered</option>
        </select>
      </div>
      {filteredOrders.length > 0 ? (
        <ul style={{ listStyle: 'none', padding: '0' }}>
          {filteredOrders.map((order) => (
            <li
              key={order._id}
              style={{
                backgroundColor: '#fff',
                padding: '15px',
                marginBottom: '20px',
                borderRadius: '10px',
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                cursor: 'pointer',
              }}
              onClick={() => handleOrderClick(order)}
            >
              <div style={{ marginBottom: '15px' }}>
                <p><strong>Order ID:</strong> {order._id}</p>
                <p><strong>Name:</strong> {order.name}</p>
                <p><strong>Address:</strong> {order.address}</p>
                <p><strong>Phone:</strong> {order.phone}</p>
                <p><strong>Total Cost:</strong> Rs. {order.totalCost}</p>
                <p><strong>Status:</strong> {order.status}</p>
                {updatingOrderId === order._id ? (
                  <p style={{ color: 'blue', fontStyle: 'italic' }}>Updating...</p>
                ) : (
                  <>
                    {order.status === 'Pending' && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleStatusChange(order._id, 'Shipped');
                        }}
                        style={{
                          marginRight: '10px',
                          padding: '8px 12px',
                          backgroundColor: '#ffc107',
                          border: 'none',
                          color: '#fff',
                          borderRadius: '4px',
                          cursor: 'pointer',
                        }}
                      >
                        Mark as Shipped
                      </button>
                    )}
                    {order.status === 'Shipped' && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation(); 
                          handleStatusChange(order._id, 'Delivered');
                        }}
                        style={{
                          marginRight: '10px',
                          padding: '8px 12px',
                          backgroundColor: '#28a745',
                          border: 'none',
                          color: '#fff',
                          borderRadius: '4px',
                          cursor: 'pointer',
                        }}
                      >
                        Mark as Delivered
                      </button>
                    )}
                  </>
                )}
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p style={{ textAlign: 'center', fontSize: '1.2rem' }}>No orders found</p>
      )}
    </div>
  );
};

export default MyOrders;
