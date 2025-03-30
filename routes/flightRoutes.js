import express from 'express';
import axios from 'axios';
import auth from '../middleware/auth.js';
import logger from '../utils/logger.js';

const router = express.Router();

// مسیر POST /search برای جستجوی پروازها
router.post('/search', auth, async (req, res, next) => {
  const { origin, destination, date } = req.body;
  logger.info(`🔍 Search request — origin: ${origin}, destination: ${destination}, date: ${date}`);

  try {
    const response = await axios.post(
      'https://safarmarket.com/api/flight/v3/search',
      req.body,
      { headers: { 'Content-Type': 'application/json' } }
    );
    logger.info(`✅ Search succeeded — found ${response.data?.length || 0} flights`);
    res.json(response.data);
  } catch (error) {
    logger.error(`❌ Search failed — ${error.message}`);
    next(error);
  }
});

// مسیر GET /:flightId برای دریافت جزئیات یک پرواز
router.get('/:flightId', auth, async (req, res, next) => {
  const { flightId } = req.params;
  logger.info(`🔍 Fetch flight details — flightId: ${flightId}`);

  try {
    const response = await axios.get(
      `https://safarmarket.com/api/flight/v3/details/${flightId}`,
      { headers: { 'Content-Type': 'application/json' } }
    );
    logger.info(`✅ Details fetched successfully for flightId: ${flightId}`);
    res.json(response.data);
  } catch (error) {
    logger.error(`❌ Fetch details failed for flightId ${flightId} — ${error.message}`);
    next(error);
  }
});

export default router;
