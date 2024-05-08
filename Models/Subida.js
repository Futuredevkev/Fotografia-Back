import mongoose from "mongoose";

const subidaSchema = new mongoose.Schema({
    tema: String,
    image: {type: String}
})

const Subida = mongoose.model('Subida', subidaSchema)

export default Subida