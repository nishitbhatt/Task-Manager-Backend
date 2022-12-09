import mongoose from 'mongoose'

const SectionsSchema = new mongoose.Schema({
    name: String
}, { timestamps: true, versionKey: false });


const SectionModel = mongoose.model('sections', SectionsSchema);

export default SectionModel