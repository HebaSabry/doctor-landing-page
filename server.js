const express = require("express");
const cors = require("cors");
const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());
app.use(express.static('public')); // Serve static files from the 'public' directory
app.get('/', (req, res) => {
  res.send('api is running');
});
app.post('/booking', (req, res) => {
  const { name, phone } = req.body;
if (!name || !phone) {
    return res.status(400).json({ message: 'Name and phone are required' });
  }

  console.log(`Received booking request: Name - ${name}, Phone - ${phone}`);
  res.json({ message: 'Booking received successfully', name, phone });
});
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

