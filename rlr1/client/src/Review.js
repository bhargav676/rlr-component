import React, { useEffect, useState } from 'react';

const ContactData = () => {
  const [contactData, setContactData] = useState([]);

  useEffect(() => {
    const fetchContactData = async () => {
      try {
        const response = await fetch('http://localhost:4000/contact-data');
        const data = await response.json();
        setContactData(data.reverse()); 
      } catch (error) {
        console.error('Error fetching contact data:', error);
      }
    };

    fetchContactData();
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-semibold text-center text-teal-600 mb-6">
        Contact Form Submissions
      </h1>
      <div className="space-y-6">
        {contactData.length > 0 ? (
          contactData.map((contact, index) => (
            <div key={index} className="bg-white shadow-lg rounded-lg p-6 border border-gray-200">
              <h2 className="text-2xl font-medium text-gray-800">{contact.name}</h2>
              <div className="mt-2">
                <p className="text-sm text-gray-500">Phone: <span className="text-gray-700">{contact.phone}</span></p>
                <p className="text-sm text-gray-500">Email: <span className="text-gray-700">{contact.email}</span></p>
                <p className="mt-2 text-sm text-gray-600">Message:</p>
                <p className="text-sm text-gray-700">{contact.message}</p>
              </div>
            </div>
          ))
        ) : (
          <p className="text-lg text-gray-600">No submissions yet.</p>
        )}
      </div>
    </div>
  );
};

export default ContactData;
