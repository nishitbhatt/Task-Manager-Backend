import mongoose from 'mongoose'


const db_connect = () => {
    // Connecting to the database
    const { MONGO_DB_URL } = process.env;

    // let DB_MONGO_URL = 'mongodb+srv://TaskManager:Paparocks_123@cluster0.3rcip.mongodb.net/zentodo'
    // let MONGO_DB_URL = 'mongodb://localhost:27017/zentodo-app'

    mongoose
        .connect(MONGO_DB_URL)
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