import Reserva from "../Models/Reserva.js";

const getReservas = async(req, res) => {
    try {
        const reservas = await Reserva.find();
        res.json(reservas)
    } catch (error) {
        res.status(500).json({error: error.message})
    }
}

const deleteReserva = async(req,res) => {
    try {
        const {reservaId} = req.params
        const reservaEliminada = await Reserva.findByIdAndDelete(reservaId)

        res.json(reservaEliminada)
        
    } catch (error) {
        
    }
}

const DeleteAll = async(req, res) => {
    try {
        const reservasEliminadas = await Reserva.deleteMany()
        res.json(reservasEliminadas)
    } catch (error) {
        
    }
}

const addReserva = async(req, res) => {
    try {
        const {nombre, fecha, apellido, servicio, telefono} = req.body; 

        const reservaExistente = await Reserva.findOne({fecha});
         if(reservaExistente) {
            return res.status(400).json({error: 'La fecha ya esta reservada'})
         }

        const nuevaReserva = new Reserva({nombre, apellido, servicio, fecha, telefono})
        await nuevaReserva.save()

        res.json(nuevaReserva)

    } catch (error) {
        res.status(500).json({error: error.message})
    }
}

export {
    getReservas,
    addReserva,
    deleteReserva,
    DeleteAll
}