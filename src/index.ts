import express from 'express'
import mongoose from 'mongoose';
import authRoutes from './routes/auth'
import { MONGO_URI, PORT } from './utils/constants';

const app = express()

const connectDB = async () => {
    try {
        await mongoose.connect(MONGO_URI!);
        console.log('MongoDB connected');
    } catch (err) {
        console.error(err);
        setTimeout(connectDB, 5000);
    }
};

connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(authRoutes)

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});