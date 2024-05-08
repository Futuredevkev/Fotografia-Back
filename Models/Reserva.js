import mongoose from 'mongoose'

const reservaSchema = new mongoose.Schema({
    nombre: String,
    apellido: String,
    telefono: Number,
    servicio: String,
    fecha: Date,

})



const Reserva = mongoose.model('Reserva', reservaSchema)

export default Reserva;