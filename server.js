const express = require("express");
const cors = require("cors");
const app = express();
app.use(express.json());
app.use(cors());
const PORT = 3000;
const mongoose = require("mongoose");
const dbuURI = "mongodb://Heba:ah146he223no303@ac-ie1mmam-shard-00-00.ypperx0.mongodb.net:27017,ac-ie1mmam-shard-00-01.ypperx0.mongodb.net:27017,ac-ie1mmam-shard-00-02.ypperx0.mongodb.net/clinic_db?ssl=true&replicaSet=atlas-hlvkh0-shard-0&authSource=admin&appName=cluster1";
mongoose.connect(dbuURI)
.then(() => {
  console.log("Connected to MongoDB");
})
.catch((err) => console.error("Error connecting to MongoDB:", err));
// 3. تعريف الـ Schema والـ Model (هيكل البيانات)
const bookingSchema = new mongoose.Schema({
  name: { type: String, required: true },
  phone: { type: String, required: true },
  date: { type: Date, default: Date.now } // إضافة تاريخ الحجز تلقائياً
});

const Booking = mongoose.model('Booking', bookingSchema);

// 4. الـ Routes
app.post('/booking', async (req, res) => {
  try {
    const { name, phone } = req.body;

    // إنشاء نسخة جديدة من البيانات بناءً على الـ Model
    const newBooking = new Booking({ name, phone });

    // حفظ البيانات في MongoDB
    await newBooking.save();

    console.log(`✅ تم حفظ حجز جديد: ${name}, mongoose.connection.name: ${mongoose.connection.name}`);
    res.json({ message: 'تم الحجز وحفظ البيانات بنجاح!', name, phone });
  } catch (error) {
    console.error('❌ فشل حفظ البيانات:', error);
    res.status(500).json({ error: 'حدث خطأ أثناء حفظ الحجز' });
  }
});

app.listen(PORT, () => {
  console.log(`السيرفر شغال على http://localhost:${PORT}`);
});
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
app.get('/all-bookings', async (req, res) => {
  try {
    const bookings = await Booking.find();
    res.json(bookings);
  } catch (err) {
    res.status(500).send('حدث خطأ أثناء جلب الحجوزات' );
  }
});
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

