// routes/authRoutes.js
import express from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

const router = express.Router();

// یک کاربر نمونه (dummy user) برای تست
const dummyUser = {
  id: 1,
  username: 'testuser',
  // هش رمز عبور "password123" که با bcrypt تولید شده
  passwordHash: '$2b$10$2TcRHD4T4iXSf8K90a9C/eiLdkWlJb1fnKXqZR4ZrhmWj.sETFXe2'
};

// مسیر POST برای ورود (login)
router.post('/login', async (req, res, next) => {
  try {
    // استخراج نام کاربری و رمز عبور از بدنه درخواست
    const { username, password } = req.body;
    
    // بررسی اینکه نام کاربری مطابقت دارد یا خیر
    if (username !== dummyUser.username) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    
    // مقایسه رمز عبور وارد شده با هش ذخیره‌شده
    const isMatch = await bcrypt.compare(password, dummyUser.passwordHash);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    
    // تولید توکن JWT
    const token = jwt.sign(
      { id: dummyUser.id, username: dummyUser.username },
      process.env.JWT_SECRET, // این متغیر باید در فایل .env یا .env.local تعریف شده باشد
      { expiresIn: '1h' } // توکن به مدت 1 ساعت معتبر است
    );
    
    // برگرداندن توکن به کاربر
    res.json({ token });
  } catch (error) {
    next(error);
  }
});

export default router;
