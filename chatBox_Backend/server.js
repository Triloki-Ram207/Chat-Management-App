import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/connectDB.js';
import authRoutes from './routes/authRoutes.js';
import UserRoutes from './routes/userRoutes.js';
import memberRoutes from './routes/memberRoutes.js';
import ticketRoutes from './routes/ticketRoutes.js';
import settingsRoutes from './routes/settingsRoutes.js';
import cors from 'cors';
import './utils/markMissedChat.js'

dotenv.config();
const app = express();


const allowedOrigins = process.env.ALLOWED_ORIGINS
  ? process.env.ALLOWED_ORIGINS.split(",")
  : [];

app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests with no origin (like mobile apps, curl)
      if (!origin) return callback(null, true);
      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      } else {
        return callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

const PORT = process.env.PORT || 5000;
app.use(express.json());
connectDB();

app.use('/api/v1', authRoutes);
app.use('/api/v1', UserRoutes);
app.use('/api/v1', memberRoutes);
app.use('/api/v1', ticketRoutes);
app.use('/api/v1', settingsRoutes);

app.get('/', (req, res) => {
  res.send('ChatBox Backend is running');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});


