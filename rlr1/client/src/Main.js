import React, { useState } from 'react';
import axios from 'axios';

const FileUpload = () => {
  const [mainImage, setMainImage] = useState(null);
  const [stepImages, setStepImages] = useState([]);
  const [stepInputs, setStepInputs] = useState(Array(10).fill(''));  // Array for step inputs
  const [title, setTitle] = useState('');
  const [abstract, setAbstract] = useState('');
  const [videoLink, setVideoLink] = useState('');
  const [componentsLink, setComponentsLink] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false); // State for loading effect

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    if (name === 'mainImage') {
      setMainImage(files[0]);
    } else {
      setStepImages((prev) => ({
        ...prev,
        [name]: files[0]
      }));
    }
  };

  const handleStepInputChange = (index, value) => {
    const updatedInputs = [...stepInputs];
    updatedInputs[index] = value;
    setStepInputs(updatedInputs);
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    setLoading(true); // Start loading

    const formData = new FormData();
    formData.append('title', title);
    formData.append('abstract', abstract);
    formData.append('videoLink', videoLink);
    formData.append('componentsLink', componentsLink);

    // Append main image
    if (mainImage) {
      formData.append('mainImage', mainImage);
    }

    // Append step images and step inputs
    for (let i = 1; i <= 10; i++) {
      if (stepImages[`step_${i}_image`]) {
        formData.append(`step_${i}_image`, stepImages[`step_${i}_image`]);
      }
      if (stepInputs[i - 1]) {
        formData.append(`step_${i}_input`, stepInputs[i - 1]);
      }
    }

    try {
      const response = await axios.post('http://localhost:4001/uploadimage', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      alert(response.data.message); // success message
      setLoading(false); // Stop loading
    } catch (err) {
      setError('Error during upload: ' + err.response?.data || err.message);
      setLoading(false); // Stop loading
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <form onSubmit={handleUpload} className="space-y-6">
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
        />
        <textarea
          placeholder="Abstract"
          value={abstract}
          onChange={(e) => setAbstract(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
        />
        
        {/* Main Image Upload */}
        <div className="relative">
          <input
            type="file"
            name="mainImage"
            onChange={handleFileChange}
            className="absolute inset-0 opacity-0 cursor-pointer"
          />
          {mainImage ? (
            <div className="w-full h-32 bg-gray-100 flex justify-center items-center rounded-lg">
              <img
                src={URL.createObjectURL(mainImage)}
                alt="Main"
                className="object-contain max-h-full"
              />
            </div>
          ) : (
            <div className="w-full h-32 bg-gray-100 flex justify-center items-center rounded-lg">
              <p className="text-gray-400">No image selected</p>
            </div>
          )}
        </div>

        {/* Step Image Uploads */}
        <p className="text-xl font-semibold mt-4">Steps</p>
        {Array.from({ length: 10 }).map((_, i) => (
          <div key={i} className="space-y-4">
            <p className="text-lg font-medium">Step {i + 1}</p>
            
            {/* Step Image */}
            <div className="relative">
              <input
                type="file"
                name={`step_${i + 1}_image`}
                onChange={handleFileChange}
                className="absolute inset-0 opacity-0 cursor-pointer"
              />
              {stepImages[`step_${i + 1}_image`] ? (
                <div className="w-full h-32 bg-gray-100 flex justify-center items-center rounded-lg">
                  <img
                    src={URL.createObjectURL(stepImages[`step_${i + 1}_image`])}
                    alt={`Step ${i + 1}`}
                    className="object-contain max-h-full"
                  />
                </div>
              ) : (
                <div className="w-full h-32 bg-gray-100 flex justify-center items-center rounded-lg">
                  <p className="text-gray-400">No image selected</p>
                </div>
              )}
            </div>

            {/* Step Input */}
            <input
              type="text"
              placeholder={`Step ${i + 1} Input`}
              value={stepInputs[i]}
              onChange={(e) => handleStepInputChange(i, e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>
        ))}

        <input
          type="text"
          placeholder="Video Link"
          value={videoLink}
          onChange={(e) => setVideoLink(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
        />
        <input
          type="text"
          placeholder="Components Link"
          value={componentsLink}
          onChange={(e) => setComponentsLink(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
        />
        
        {/* Upload Button */}
        <button
          type="submit"
          className="w-full py-2 bg-teal-500 text-white rounded-lg hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-500"
        >
          {loading ? (
            <div className="flex justify-center items-center">
              <div className="animate-spin h-5 w-5 border-4 border-teal-500 border-t-transparent rounded-full"></div>
              <span className="ml-2">Uploading...</span>
            </div>
          ) : (
            'Upload'
          )}
        </button>
      </form>

      {error && <p className="text-red-500 mt-4">{error}</p>}
    </div>
  );
};

export default FileUpload;
