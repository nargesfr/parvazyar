import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import logger from './utils/logger.js';
import notifyRoutes from './routes/notifyRoutes.js';
import cron from 'node-cron';
import { checkFlights } from './utils/checkFlights.js';



// Load environment variables
dotenv.config();

// Import routes
import flightRoutes from './routes/flightRoutes.js';
import authRoutes from './routes/authRoutes.js';

const app = express();

// Middleware to parse JSON and enable CORS
app.use(express.json());
app.use(cors());
app.use('/api/notify', notifyRoutes);

// تست: چاپ یک پیام لاگ هنگام راه‌اندازی سرور
logger.info('Starting server...');

// Mount routes
app.use('/api/flights', flightRoutes);
app.use('/api/auth', authRoutes);

// Simple test route
app.get('/', (req, res) => {
  res.send('Backend is running using ES6 modules!');
});

// Error handling middleware
app.use((err, req, res, next) => {
  logger.error(err.stack);
  res.status(err.status || 500).json({ message: err.message || 'Something went wrong!' });
});

// راه‌اندازی سرور
const PORT = process.env.PORT || 5002;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  logger.info(`Server running on port ${PORT}`);
});
cron.schedule('*/5 * * * *', () => {
  console.log('🕒 در حال بررسی پروازهای کاربران...');
  checkFlights();
});