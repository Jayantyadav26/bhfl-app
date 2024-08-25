import express from 'express';
import bodyParser from 'body-parser';

const app = express();
const port = 4000;

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Root route to handle GET requests at the root URL
app.get('/', (req, res) => {
    res.send('Welcome to the BFHL API');
});

// Replace with your actual user details
const userId = "john_doe_17091999";
const email = "john@xyz.com";
const rollNumber = "ABCD123";

// POST /bfhl endpoint
app.post('/bfhl', (req, res) => {
    const { data } = req.body;

    // Validate the input
    if (!Array.isArray(data)) {
        return res.status(400).json({
            is_success: false,
            message: "Invalid input. 'data' should be an array."
        });
    }

    const numbers = [];
    const alphabets = [];
    let highestLowercaseAlphabet = '';

    data.forEach(item => {
        if (!isNaN(item)) {
            numbers.push(item);
        } else if (typeof item === 'string' && item.length === 1) {
            alphabets.push(item);
            if (item === item.toLowerCase() && item > highestLowercaseAlphabet) {
                highestLowercaseAlphabet = item;
            }
        }
    });

    res.json({
        is_success: true,
        user_id: userId,
        email: email,
        roll_number: rollNumber,
        numbers: numbers,
        alphabets: alphabets,
        highest_lowercase_alphabet: highestLowercaseAlphabet ? [highestLowercaseAlphabet] : []
    });
});

// GET /bfhl endpoint
app.get('/bfhl', (req, res) => {
    res.json({
        operation_code: 1
    });
});

app.listen(port, () => {
    console.log(`API is running at http://localhost:${port}`);
});
