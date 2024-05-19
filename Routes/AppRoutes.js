import express from 'express'
import { addPicture, deleteAllPictures, deletePicture, getAllPictures, getFilters } from '../Controllers/PicturesControll.js'
import { getReservas, addReserva, deleteReserva, DeleteAll } from '../Controllers/ReservaControll.js'
import { register, user } from '../Controllers/LoginControll.js';
import { addPictureDowloand, deleteAllPicturesDowloand, deletePictureDowloand, downloadAllFiles, getAllPicturesDowloand } from '../Controllers/DowloandsPicture.js';
import multer from "multer";
const upload = multer({ dest: 'uploads/' }); 

const router = express.Router();

router.get('/reservas', getReservas)
router.post('/reserva', addReserva)
router.delete('/reserva/:reservaId', deleteReserva)
router.delete('/reserva-all', DeleteAll)

// Pictures 

router.post('/picture',upload.array('image'), addPicture)
router.get('/pictures', getAllPictures)
router.get('/filterPictures', getFilters)
router.delete('/deletePicture/:pictureId', deletePicture)
router.delete('/deletePictures-all', deleteAllPictures)

// Dowloands image 

router.post('/dowloands', upload.array('dowloandimage'), addPictureDowloand)
router.get('/picturesDowloands', getAllPicturesDowloand)
router.delete('/deletePictureDowloands/:pictureId', deletePictureDowloand)
router.delete('/deletePicturesDowloands', deleteAllPicturesDowloand)
router.get('/descargar-imagenes', async (req, res) => {
    const outputDir = '/tmp'; 
    const zipFilePath = await downloadAllFiles(outputDir);

    if (zipFilePath) {
        res.download(zipFilePath, 'downloads.zip'); 
    } else {
        res.status(500).send('Error al descargar archivos');
    }
});

// Inicio Seccion 

router.post('/login', user)
router.post('/register', register)


export default router