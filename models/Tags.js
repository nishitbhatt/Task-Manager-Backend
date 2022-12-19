import mongoose, { Types } from 'mongoose'

export const TagsSchema = new mongoose.Schema({
    name: { type: String, required: true },
    userid: { type: Types.ObjectId, required: true },
}, {
    timestamps: true, versionKey: false,
});


const TagsModel = mongoose.model('tags', TagsSchema);

export default TagsModel