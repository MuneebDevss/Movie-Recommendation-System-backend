const express = require('express');
const connectDB = require('./config/db');
const appConfig = require('./config/appConfig');
const userRoutes = require('./routes/user');
const adminRoutes = require('./routes/admin');
const movieRoutes = require('./routes/movies');
const reviewRoutes = require('./routes/reviews');
const recommendationRoutes = require('./routes/recommendations');
const customListRoutes = require('./routes/lists');
const notificationRoutes = require('./routes/notification');
const discussionRoutes = require('./routes/discussion');
const articleRoutes = require('./routes/news');
const searchRoutes = require('./routes/search');
const errorHandler = require('./middlewares/errorHandler');
const cors = require('cors');

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(express.json());
const corsOptions = {
    origin: appConfig.frontendUrl,  // Get the frontend URL from config
    optionsSuccessStatus: 200    // For legacy browsers
};

// Apply CORS middleware with the options
app.use(cors({
    origin: '*' // replace with your frontend's URL
}));


// Routes
app.use('/api/users', userRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/movies', movieRoutes);
app.use('/api/reviews', reviewRoutes);
app.use('/api/recommendations', recommendationRoutes);
app.use('/api/lists', customListRoutes);
app.use('/api/notifications', notificationRoutes);
app.use('/api/discussions', discussionRoutes);
app.use('/api/articles', articleRoutes);
app.use('/api', searchRoutes);

// Error Handler
app.use(errorHandler);

// Start Server
const PORT = appConfig.port;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
