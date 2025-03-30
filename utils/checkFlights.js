// utils/checkFlights.js
import fs from 'fs';
import path from 'path';
import axios from 'axios';
import { sendFlightNotification } from './mailer.js';

const requestsFilePath = path.join('data', 'userRequests.json');

// تابع اصلی بررسی پروازها
export const checkFlights = async () => {
  try {
    const rawData = fs.readFileSync(requestsFilePath);
    const requests = JSON.parse(rawData);

    for (const request of requests) {
      const { email, origin, destination, date } = request;

      const searchData = {
        platform: 'WEB_DESKTOP',
        uid: '',
        limit: 20,
        compress: false,
        productType: 'LFLI',
        searchValidity: 2,
        cid: 1,
        checksum: 1,
        IPInfo: {
          ip: '11.12.13.14',
          isp: 'a',
          city: 'teh',
          country: 'ir'
        },
        searchFilter: {
          sourceAirportCode: origin,
          targetAirportCode: destination,
          sourceIsCity: true,
          targetIsCity: true,
          leaveDate: date,
          returnDate: '',
          adultCount: 1,
          childCount: 0,
          infantCount: 0,
          economy: true,
          business: true
        }
      };

      const response = await axios.post(
        'https://safarmarket.com/api/flight/v3/search',
        searchData,
        { headers: { 'Content-Type': 'application/json' } }
      );

      const flights = response.data.result?.flights;
      if (flights && flights.length > 0) {
        const flight = flights[0];
        const provider = flight.providers[0];

        const flightData = {
          origin,
          destination,
          date,
          price: provider?.price,
          url: provider?.url
        };

        await sendFlightNotification(email, flightData);
      }
    }
  } catch (error) {
    console.error('❌ خطا در بررسی پرواز:', error.message);
  }
};
