import mongoose from 'mongoose'

const ListsSchema = new mongoose.Schema({
    name: String
}, { timestamps: true, versionKey: false });


const ListsModel = mongoose.model('lists', ListsSchema);

export default ListsModel