import mongoose from 'mongoose'


const db_connect = () => {
    // Connecting to the database
    const { MEDIUM, MONGO_URI, LIVE_MONGO_URI } = process.env;

    let DB_MONGO_URL = 'mongodb+srv://TaskManager:Paparocks_123@cluster0.3rcip.mongodb.net/zentodo'
    // let DB_MONGO_URL = 'mongodb://localhost:27017/zentodo-app'

    mongoose
        .connect(DB_MONGO_URL)
        .then(() => {
            console.log('Successfully connected to database');
        })
        .catch((error) => {
            console.log('database connection failed. exiting now...');
            console.error(error);
            process.exit(1);
        });
};

export default db_connect