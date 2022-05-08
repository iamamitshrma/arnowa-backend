import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

import userRoutes from './routes/user.js';
import messageRoutes from './routes/message.js';

const app = express();
dotenv.config();

app.use(bodyParser.json({ limit: '30mb', extended: true }));
app.use(bodyParser.urlencoded({limit: '30mb', extended: true}));
app.use(cors());

app.use('/', messageRoutes);
app.use('/auth', userRoutes);

//heroku
app.get('/', (req, res) => {
    res.send('App is Running');
});

const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.CONNECTION_URL,  {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => app.listen(PORT, () => console.log(`Server Running on port: ${PORT}`)))
.catch((err) => console.log(err.message));