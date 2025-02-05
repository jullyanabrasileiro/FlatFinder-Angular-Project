require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const userRoutes = require('./routes/userRoutes.js');
const flatRoutes = require('./routes/flatRoutes.js');
const messageRoutes = require('./routes/messageRoutes.js');

const app = express();

app.use(express.json());
app.use(cors());


mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('MongoDB connected!'))
.catch(error => console.error('Error with MongoDB connection:', error));

app.use('/users', userRoutes);
app.use('/flats', flatRoutes);
app.use('/messages', messageRoutes);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server on: ${PORT}`));
