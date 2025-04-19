import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/database';
import customerRoutes from './routes/customerRoutes';

dotenv.config();
const app = express();

app.use(express.json());

// Health check endpoint
app.get("/ping", (req, res) => {
  res.json({
    errorCode: 200,
    errorMessage: "Pong",
    data: null,
  });
});

// Customer routes
app.use('/api', customerRoutes);

const PORT = process.env.PORT || 3001;

connectDB().then(() => {
  app.listen(PORT, () => console.log(`Customer service đang chạy tại cổng ${PORT}`));
});