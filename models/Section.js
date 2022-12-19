import mongoose, { Types } from 'mongoose'

const SectionSchema = new mongoose.Schema({
    name: { type: String, required: true },
    list: {
        type: Types.ObjectId,
        ref: 'list'
    },
    userid: { type: Types.ObjectId, required: true },
}, {
    timestamps: true, versionKey: false,
});


const SectionModel = mongoose.model('section', SectionSchema);

export default SectionModel