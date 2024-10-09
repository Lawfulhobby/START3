// BasenameComponent.tsx

import React, { useState } from 'react';
import { getBasenameAddress, Basename } from '@/apis/basenames';

const BasenameComponent: React.FC = () => {
  // State to hold the user input for basename
  const [basename, setBasename] = useState<Basename>('' as Basename);
  
  // State to hold the fetched address
  const [address, setAddress] = useState<string | null>(null);
  
  // State to manage loading status
  const [loading, setLoading] = useState<boolean>(false);
  
  // State to handle errors
  const [error, setError] = useState<string | null>(null);

  // Handle input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBasename(e.target.value as Basename);
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevent page reload
    setLoading(true);   // Start loading
    setError(null);     // Reset previous errors
    setAddress(null);   // Reset previous address

    try {
      // Fetch the address using the API function
      const addressRes = await getBasenameAddress(basename);
      
      // Update the address state with the fetched result
      setAddress(addressRes);
    } catch (err) {
      // Handle any errors that occur during the fetch
      setError('Failed to fetch address. Please try again.');
    } finally {
      // Stop loading regardless of success or failure
      setLoading(false);
    }
  };

  return (
    <main className='flex  flex-col gap-12 text-black'>
      <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
        <label htmlFor="basename" className='text-lg font-medium'>
          Enter Basename:
        </label>
        <input
          type="text"
          id="basename"
          value={basename}
          onChange={handleInputChange}
          placeholder="e.g., start3.base.eth"
          required
          className='p-2 border border-gray-300 rounded-md'
        />
        <button
          type="submit"
          className='px-4 py-2 bg-[#A479FF] text-white rounded-md hover:bg-blue-700 transition-colors'
        >
          Get Address
        </button>
      </form>

      {/* Display loading state */}
      {loading && <span>Loading...</span>}

      {/* Display error message if any */}
      {error && <span className='text-red-500'>{error}</span>}

      {/* Display the fetched address */}
      {address && (
        <div className='mt-4'>
          <span className='block text-lg font-semibold'>Address Resolved:</span>
          <strong className='text-xl'>{address}</strong>
        </div>
      )}
    </main>
  );
};

export default BasenameComponent;