const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());
app.get('/', (req, res) => {
  res.send('api is running');
});
app.post('/booking', (req, res) => {
  const { name, phone } = req.body;
  console.log(`Received booking request: Name - ${name}, Phone - ${phone}`);
  res.json({ message: 'Booking received successfully', name, phone });
});
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

fetch('http://localhost:3000/booking', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    name: "test",
    phone: "01065639112"
  })
})
.then(res => res.json())
.then(data => console.log(data));

function scrollToContact() {
  document.getElementById("contact").scrollIntoView({
    behavior: "smooth"
  });
};