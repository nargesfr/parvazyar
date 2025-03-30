import bcrypt from 'bcrypt';

const testPassword = "password123";
const storedHash = "$2b$10$1Hms2b/vRrj8cQ3AB9iK.u.sS6Z6F.YAqIzHkDpChwCVHvPbEMW72";

bcrypt.compare(testPassword, storedHash)
  .then(result => console.log("مقایسه رمز:", result))  // انتظار داریم true چاپ شود
  .catch(err => console.error(err));
