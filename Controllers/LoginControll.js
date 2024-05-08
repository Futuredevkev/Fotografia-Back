import User from "../Models/UserSchema.js";
import bcrypt from 'bcryptjs';

const user = async(req, res) => {
    try {
        const { username, password } = req.body;

        // Buscar el usuario en la base de datos

        const user = await User.findOne({ username });

        if (!user) {
            return res.status(400).json({ msg: 'Usuario no encontrado' });
        }

        // Comparar la contraseña proporcionada con la contraseña almacenada en la base de datos

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({ msg: 'Contraseña incorrecta' });
        }

        res.status(200).json({ success: true, msg: 'Inicio de sesión exitoso' });
    } catch (error) {
        res.status(500).json({ msg: 'Error interno del servidor' });
    }
}

const register = async(req, res) => {
    try {
        const { username, password } = req.body;

        // Verifica si el usuario ya existe en la base de datos
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(400).json({ msg: 'El nombre de usuario ya está en uso' });
        }

        // Genera el hash de la contraseña
        const hashedPassword = await bcrypt.hash(password, 10);

        // Crea un nuevo usuario con la contraseña hasheada
        const newUser = new User({ username, password: hashedPassword });
        await newUser.save();

        res.status(201).json({ msg: 'Usuario creado correctamente' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Error interno del servidor' });
    }
}

export {
    user,
    register
}
