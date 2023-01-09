const mongoose = require('mongoose')
require('dotenv').config()

const database_url = process.env.MONGODB_URL || 'mongodb://127.0.0.1:27017/MovingWorlds';

mongoose.set('strictQuery', false);

mongoose.connect(database_url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).catch(error => {
    console.error(error)
})

mongoose.connection.on('connected', () => {
    console.log('Client connected to mongo database');
})

mongoose.connection.on('error', (err) => {
    console.log(err.message);
})

mongoose.connection.on('disconnected', () => {
    console.log('Client disconnected from mongodb');
})

process.on('SIGINT', async () => {
    await mongoose.connection.close()
    process.exit(0)
})