import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();

// تابع برای ارسال ایمیل به کاربر
export const sendFlightNotification = async (toEmail, flightData) => {
  try {
    // ایجاد transporter با اطلاعات ورود ایمیل شما
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });

    // تنظیمات ایمیل
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: toEmail,
      subject: '🏷️ پرواز مورد نظرت پیدا شد!',
      html: `
  <h2>✈️ پرواز از ${flightData.origin} به ${flightData.destination} موجود است</h2>
  <p>تاریخ: ${flightData.date}</p>
  <p>قیمت: ${flightData.price ? flightData.price.toLocaleString() : 'نامشخص'} تومان</p>
  <p>برای خرید سریع‌تر می‌تونی روی لینک زیر کلیک کنی:</p>
  <a href="${flightData.url}" target="_blank">مشاهده در سایت فروشنده</a>
`

    };

    // ارسال ایمیل
    await transporter.sendMail(mailOptions);
    console.log(`📨 ایمیل با موفقیت ارسال شد به ${toEmail}`);
  } catch (error) {
    console.error('🚫 خطا در ارسال ایمیل:', error.message);
  }
};
