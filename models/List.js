import mongoose, { Types } from 'mongoose'

const ListSchema = new mongoose.Schema({
    name: { type: String, required: true },
    userid: { type: Types.ObjectId, required: true },
}, {
    timestamps: true, versionKey: false,
});


const ListModel = mongoose.model('list', ListSchema);

export default ListModel