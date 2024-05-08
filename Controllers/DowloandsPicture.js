import Dowloand from '../Models/Dowloand.js'
import { uploadFile } from "../util/UploadFile.js";
import { storage } from '../firebase.js'
import { getDownloadURL, ref, listAll } from "firebase/storage";
import JSZip from "jszip";
import fs from "fs";
import path from "path";


const addPictureDowloand = async (req, res) => {
    try {
        const dowloandimage = req.files.dowloandimage;

        if(dowloandimage && dowloandimage.length > 0) {
            const {dowloandURL} = await uploadFile(dowloandimage[0], 'dowloands')

            const newDowloand = await new Dowloand({
                dowloandimage: dowloandURL
            }).save()
               return res.status(200).json({newDowloand})
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Hubo un error interno' });
    }
}

const getAllPicturesDowloand = async(req, res) => {
    try {
        const allPictures = await Dowloand.find();
        res.status(200).json(allPictures)
    } catch (error) {
        res.status(500).json({error: 'No se ha encontrado la foto'})
    }
}

const deletePictureDowloand = async (req, res) => {
    try {
        const pictureId = req.params.pictureId;
        const picture = await Dowloand.findById(pictureId);

        if (!picture) {
            return res.status(404).json({ error: 'La imagen no existe' });
        }

        await Dowloand.findByIdAndDelete(pictureId);

        res.status(200).json({ message: 'Imagen eliminada correctamente' });
    } catch (error) {
        console.error('Error al eliminar imagen:', error);
        res.status(500).json({ error: 'Hubo un error interno' });
    }
};

const deleteAllPicturesDowloand = async(req, res) => {
    try {
        const SubidasEliminadas = await Dowloand.deleteMany()
        res.json(SubidasEliminadas)
    } catch (error) {
        
    }
}

const downloadAllFiles = async (outputDir) => {
    try {

        // Verificar si el directorio de salida existe, si no, crearlo

        if (!fs.existsSync(outputDir)) {
            fs.mkdirSync(outputDir, { recursive: true });
        }

        const storageRef = ref(storage, 'dowloands/'); // Referencia a la carpeta 'downloads'
        const filesList = await listAll(storageRef); // Obtener la lista de archivos en la carpeta

        const zip = new JSZip();

        
        await Promise.all(filesList.items.map(async (fileRef) => {
            let fileName = path.basename(fileRef.name);
            fileName = fileName.replace(/\d+$/, '');
            const url = await getDownloadURL(fileRef);
            const response = await fetch(url);
            const fileData = await response.arrayBuffer();
            zip.file(fileName, fileData); // Agregar el archivo al ZIP
        }));

        // Generar el archivo ZIP una vez que se hayan descargado todos los archivos
        const content = await zip.generateAsync({ type: "nodebuffer" });

        // Escribir el archivo ZIP en el sistema de archivos del servidor
        const zipFilePath = path.join(outputDir, 'downloads.zip');
        fs.writeFileSync(zipFilePath, content);

        console.log('Archivos descargados y empaquetados correctamente.');

        // Devolver la ruta del archivo ZIP para que el usuario pueda descargarlo manualmente
        return zipFilePath;

    } catch (error) {
        console.error('Error al descargar archivos:', error);
        return null;
    }
};

export {
    addPictureDowloand,
    getAllPicturesDowloand,
    deleteAllPicturesDowloand,
    deletePictureDowloand,
    downloadAllFiles
}
