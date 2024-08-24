// App.js
import React, { useState } from 'react';
import Axios from 'axios';

const KEY = '3917bcb925d5fbde119142a05c47658d';

const App = () => {
  const [city, setCity] = useState('');
  const [data, setData] = useState(null);
  const [error, setError] = useState('');

  const fetchData = async () => {
    try {
      const response = await Axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${KEY}&units=metric`);
      setData(response.data);
      setError('');
    } catch (err) {
      setError('Error in API call. Please check the city name.');
      setData(null);
    }
  };

  return (
    <div className='min-h-screen flex flex-col items-center justify-center bg-gray-100 p-5'>
      <div className='bg-white p-10 rounded-lg shadow-lg text-center w-full max-w-md'>
        <h1 className='text-3xl font-bold mb-5 text-indigo-600'>Weather App</h1>
        <div className='mb-5'>
          <input
            type="text"
            className='border border-gray-300 p-2 rounded-lg w-full'
            value={city}
            onChange={e => setCity(e.target.value)}
            placeholder='Enter the City Name'
          />
          <button
            className='mt-2 bg-indigo-500 text-white px-4 py-2 rounded-lg shadow hover:bg-indigo-700 transition duration-300'
            onClick={fetchData}
          >
            Fetch
          </button>
        </div>

        {error && <p className='text-red-500 mb-4'>{error}</p>}

        {data && (
          <div className='mt-5'>
            <p className='text-2xl font-medium'>City: {data.name}</p>
            <p className='text-xl'>Temperature: {data.main.temp}°C</p>
            <p className='text-lg text-gray-500'>Weather: {data.weather[0].main}</p>
            <p className='text-sm text-gray-600'>Description: {data.weather[0].description}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
