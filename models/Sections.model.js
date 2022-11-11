import mongoose from 'mongoose'

const SectionsSchema = new mongoose.Schema({
    name: String
});


const SectionModel = new mongoose.model('sections', SectionsSchema);

export default SectionModel