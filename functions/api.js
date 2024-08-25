import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors'; // Add this import
const app = express();
const router = express.Router();

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Route: POST /bfhl
router.post('/bfhl', (req, res) => {
  const data = req.body.data;
  const numbers = data.filter(item => !isNaN(item));
  const alphabets = data.filter(item => isNaN(item));
  const highestLowercase = alphabets
    .filter(item => item === item.toLowerCase())
    .sort()
    .pop() || null;

  res.json({
    is_success: true,
    user_id: 'john_doe_17091999',
    email: 'john@xyz.com',
    roll_number: 'ABCD123',
    numbers,
    alphabets,
    highest_lowercase_alphabet: highestLowercase ? [highestLowercase] : [],
  });
});

// Route: GET /bfhl
router.get('/bfhl', (req, res) => {
  res.json({
    operation_code: 1,
  });
});

app.use('/api', router); // Changed the base path to `/api` for Vercel

// Vercel automatically handles deployment for serverless functions
export default app;
