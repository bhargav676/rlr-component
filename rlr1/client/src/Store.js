import React, { useEffect, useState } from 'react';
import axios from 'axios';

function ImageList() {
  const [components, setComponents] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchComponents = async () => {
      try {
        const response = await axios.get('https://rlr-component-server.vercel.app/components');
        setComponents(response.data);
      } catch (error) {
        setMessage("Error fetching components"); 
      }
    };

    fetchComponents();
  }, []);

  const handleDelete = async (id) => {
    if (!id) {
      setMessage("Invalid component ID");
      return;
    }
  
    try {
      const response = await axios.delete(`https://rlr-component-server.vercel.app/components/${id}`);
      
      if (response.status === 200) {  
        setMessage("Component deleted successfully");
        setComponents(components.filter(component => component._id !== id));
      } else {
        setMessage("Unexpected response from server");
      }
    } catch (error) {
      
      if (error.response) {
        
        setMessage(`Error deleting component: ${error.response.data.message || error.response.statusText}`);
      } else if (error.request) {
       
        setMessage("No response from server. Please try again later.");
      } else {
        
        setMessage(`Error: ${error.message}`);
      }
    }
  };
  

  return (
    <>
      <style>
        {`
      
.description-container {
  overflow: hidden; 
  display: -webkit-box;
  -webkit-line-clamp: 3; 
  -webkit-box-orient: vertical;
  text-overflow: ellipsis;
  margin-top: 4px; 
}

.description {
  font-size: 1rem; 
  color: #4a4a4a; 
  line-height: 1.5; 
}

      `}
      </style>
      <div className="container mx-auto p-6">
        <h2 className="text-2xl font-semibold mb-6">Uploaded Components</h2>
        {message && <p className="text-center text-red-500">{message}</p>}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {components.length > 0 ? (
            components.map((component) => (
              <div key={component._id} className="bg-white border rounded-lg shadow-lg p-4">
                <img src={component.url} alt={component.name} className="w-full h-48 object-cover rounded-md mb-4" />
                <p className="text-lg font-bold">{component.name}</p>
                <p>Quantity: {component.quantity}</p>
                <p>Price: Rs{component.price}</p>
                <div className="description-container">
                  <p className="description">{component.description}</p>
                </div>
                <button
                  onClick={() => handleDelete(component._id)}
                  className="mt-4 bg-red-500 text-white py-2 px-4 rounded hover:bg-red-700 transition duration-200"
                >
                  Delete
                </button>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500">No components available</p>
          )}
        </div>
      </div>
    </>
  );
}

export default ImageList;
