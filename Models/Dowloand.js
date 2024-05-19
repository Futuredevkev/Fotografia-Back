import mongoose from "mongoose";

const dowloandSchema = new mongoose.Schema({
    dowloandimage: [String]
});

const Dowloand = mongoose.model('Dowloand', dowloandSchema);

export default Dowloand;
