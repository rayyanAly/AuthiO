import colors from 'colors';
import dotenv from 'dotenv';
import express from 'express';
import path from 'path';
import connectDB from './config/db.js';
import { errorHandler, notFound } from './middlewares/errorMiddleware.js';
import userRoutes from './routes/userRoutes.js';

dotenv.config();

connectDB();

const app = express();
app.use(express.json()); // Parsing http request body


app.use('/api/users', userRoutes);

// Create a static folder
const __dirname = path.resolve();

if (process.env.NODE_ENV === 'production') {
	app.use(express.static(path.join(__dirname, '/frontend/build')));

	app.get('*', (req, res) => {
		res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'));
	});
} else {
	app.get('/', (req, res) => {
		res.send('API is running...');
	});
}

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
	console.log(
		`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
	);
});
