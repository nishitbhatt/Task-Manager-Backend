import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
    userslug: { type: String, default: null, unique: true },
    first_name: { type: String, default: null },
    last_name: { type: String, default: null },
    email: { type: String, unique: true },
    password: { type: String },
    contact_no: { type: String },
    token: { type: String },
    is_active: { type: Number }
}, {
    timestamps: true, versionKey: false,
});

const UserModel = mongoose.model('users', userSchema)
export default UserModel