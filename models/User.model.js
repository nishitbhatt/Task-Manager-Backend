import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
    userslug: { type: String, default: null },
    first_name: { type: String, default: null },
    last_name: { type: String, default: null },
    email: { type: String, unique: true },
    password: { type: String },
    contact_no: { type: String },
    token: { type: String },
    isactive: { type: Number }
});

const UserModel = mongoose.model('user', userSchema)
export default UserModel