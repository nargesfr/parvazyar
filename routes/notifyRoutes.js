import express from 'express';
import fs from 'fs';
import path from 'path';

const router = express.Router();

const filePath = path.join(process.cwd(), 'data', 'requests.json');

router.post('/subscribe', (req, res) => {
  const { email, origin, destination, date } = req.body;

  if (!email || !origin || !destination || !date) {
    return res.status(400).json({ message: 'لطفاً همه فیلدها رو پر کنید' });
  }

  let requests = [];
  if (fs.existsSync(filePath)) {
    const fileData = fs.readFileSync(filePath, 'utf-8');
    requests = JSON.parse(fileData || '[]');
  }

  requests.push({ email, origin, destination, date });
  fs.writeFileSync(filePath, JSON.stringify(requests, null, 2));

  res.json({ message: 'درخواستت با موفقیت ذخیره شد 😊' });
});

export default router;

