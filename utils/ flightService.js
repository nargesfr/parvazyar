import axios from 'axios';

// تابعی برای جستجوی پروازها
export const searchFlights = async (searchData) => {
  const response = await axios.post(
    'https://safarmarket.com/api/flight/v3/search',
    searchData,
    { headers: { 'Content-Type': 'application/json' } }
  );
  return response.data;
};

// تابعی برای دریافت جزئیات یک پرواز
export const getFlightDetails = async (flightId) => {
  const response = await axios.get(
    `https://safarmarket.com/api/flight/v3/details/${flightId}`,
    { headers: { 'Content-Type': 'application/json' } }
  );
  return response.data;
};
