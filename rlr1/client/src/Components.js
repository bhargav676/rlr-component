import React, { useState } from 'react';
import axios from 'axios';

function UploadImage() {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState(''); // 'error' or 'success'
  const [name, setName] = useState('');
  const [quantity, setQuantity] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false); // New state for loading

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result); // Set image preview
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  const handleUpload = async () => {
    if (!file || !name || !quantity || !price || !description) {
      setMessage("Please fill in all fields and select a file.");
      setMessageType('error');
      return;
    }

    setLoading(true); // Start loading
    setMessage('Uploading image...'); // Show loading message
    setMessageType(''); // Reset message type

    const formData = new FormData();
    formData.append('file', file);
    formData.append('name', name);
    formData.append('quantity', quantity);
    formData.append('price', price);
    formData.append('description', description);

    try {
      const response = await axios.post('https://rlr-component-server.vercel.app/components', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setMessage(response.data.status);
      setMessageType('success'); // Set success message
    } catch (error) {
      setMessage('Image upload failed');
      setMessageType('error'); // Set error message
    } finally {
      setLoading(false); // Stop loading
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold text-gray-700 mb-6 text-center">Upload Image</h2>
        <div className="space-y-4">
          {/* Custom file input */}
          <div className="relative">
            <input
              type="file"
              onChange={handleFileChange}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            />
            {preview ? (
              <img
                src={preview}
                alt="Selected"
                className="block w-full h-32 object-cover rounded-lg border-2 border-gray-300"
              />
            ) : (
              <div className="w-full h-32 bg-gray-200 border-2 border-gray-300 rounded-lg flex items-center justify-center text-gray-500">
                Choose an image
              </div>
            )}
          </div>

          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Name"
            className="block w-full px-4 py-2 text-gray-700 bg-white border rounded-lg focus:border-teal-400 focus:ring-2 focus:ring-teal-400 focus:outline-none"
          />
          <input
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            placeholder="Quantity"
            className="block w-full px-4 py-2 text-gray-700 bg-white border rounded-lg focus:border-teal-400 focus:ring-2 focus:ring-teal-400 focus:outline-none"
          />
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="Price"
            className="block w-full px-4 py-2 text-gray-700 bg-white border rounded-lg focus:border-teal-400 focus:ring-2 focus:ring-teal-400 focus:outline-none"
          />
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Description"
            rows="3"
            className="block w-full px-4 py-2 text-gray-700 bg-white border rounded-lg focus:border-teal-400 focus:ring-2 focus:ring-teal-400 focus:outline-none"
          ></textarea>
        </div>
        <button
          onClick={handleUpload}
          className="w-full py-2 mt-6 text-white bg-teal-500 hover:bg-teal-600 rounded-lg transition duration-200"
        >
          {loading ? (
            <div className="flex items-center justify-center">
              <div className="w-4 h-4 border-4 border-t-transparent border-teal-500 border-solid rounded-full animate-spin"></div>
              <span className="ml-2">Uploading...</span>
            </div>
          ) : (
            'Upload'
          )}
        </button>
        {message && (
          <p
            className={`mt-4 text-center text-sm font-medium ${
              messageType === 'error' ? 'text-red-500' : 'text-green-500'
            }`}
          >
            {message}
          </p>
        )}
      </div>
    </div>
  );
}

export default UploadImage;
