// server.js
console.log('🔥 this is the server.js I’m editing');

import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import logger from './utils/logger.js';
import notifyRoutes from './routes/notifyRoutes.js';
import flightRoutes from './routes/flightRoutes.js';
import authRoutes from './routes/authRoutes.js';
import cron from 'node-cron';
import { checkFlights } from './utils/checkFlights.js';



dotenv.config();
console.log('🚀 loading server.js, PORT=', process.env.PORT || 5002);


const app = express();

// اول CORS و JSON body parser
app.use(cors());
app.use(express.json());

// **تعریف endpoint تست قبل از همه**
app.get('/api/test', (req, res) => {
  console.log('👀 received GET /api/test');
  res.json({ message: 'Backend is working!' });
});


// سپس بقیه‌ی routeها
app.use('/api/auth', authRoutes);
app.use('/api/flights', flightRoutes);
app.use('/api/notify', notifyRoutes);

// مسیر اصلی
app.get('/', (req, res) => {
  res.send('Backend is running using ES6 modules!');
});

// Error handler (آخرین middleware)
app.use((err, req, res, next) => {
  logger.error(err.stack);
  res.status(err.status || 500).json({ message: err.message || 'Something went wrong!' });
});

const PORT = process.env.PORT || 5002;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
  logger.info(`Server running on port ${PORT}`);
});

// کرون جاب برای checkFlights
cron.schedule('*/5 * * * *', () => {
  console.log('🕒 در حال بررسی پروازهای کاربران…');
  checkFlights();
});
