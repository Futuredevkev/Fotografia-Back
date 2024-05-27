import Dowloand from "../Models/Dowloand.js";
import { uploadFile } from "../util/UploadFile.js";
import JSZip from "jszip";
import fs from "fs";
import path from "path";
import fetch from "node-fetch"


const addPictureDowloand = async (req, res) => {
  try {
    const {dowloandimage} = req.body; 
    if(dowloandimage && dowloandimage.length > 0) {
      const newDowloands = await Promise.all(dowloandimage.map(url => {
       return new Dowloand({
           dowloandimage: url,
        }).save();
       }));
       return res.status(200).json({newDowloands})
    } else {
        return res.status(400).json({ error: 'No images were uploaded' });
   }
 } catch (error) {
   console.error(error);
   return res.status(500).json({ error: "Hubo un error interno" });
 }
};

const getAllPicturesDowloand = async (req, res) => {
  try {
    const allPictures = await Dowloand.find();
    res.status(200).json(allPictures);
  } catch (error) {
    res.status(500).json({ error: "No se ha encontrado la foto" });
  }
};

const deletePictureDowloand = async (req, res) => {
  try {
    const pictureId = req.params.pictureId;
    const picture = await Dowloand.findById(pictureId);

    if (!picture) {
      return res.status(404).json({ error: "La imagen no existe" });
    }

    await Dowloand.findByIdAndDelete(pictureId);

    res.status(200).json({ message: "Imagen eliminada correctamente" });
  } catch (error) {
    console.error("Error al eliminar imagen:", error);
    res.status(500).json({ error: "Hubo un error interno" });
  }
};

const deleteAllPicturesDowloand = async (req, res) => {
  try {
    const SubidasEliminadas = await Dowloand.deleteMany();
    res.json(SubidasEliminadas);
  } catch (error) {}
};

const downloadAllFiles = async (req, res) => {
  try {
    const outputDir = '/tmp';
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    const allPictures = await Dowloand.find();
    const zip = new JSZip();

    await Promise.all(
      allPictures.map(async (picture) => {
        const pictureUrl = picture.dowloandimage;

        const url = `${pictureUrl}`;
        
        if (typeof url === 'string') {
          try {
            console.log(`Fetching image from: ${url}`); 
            const response = await fetch(url); 
            const fileData = await response.arrayBuffer();
            const fileName = path.basename(url);
            zip.file(fileName, fileData);
            console.log(`Added file to zip: ${fileName}`); 
          } catch (error) {
            console.error(`Error fetching image from ${url}:`, error);
          }
        } else {
          console.error("Invalid URL:", url);
        }
      })
    );

    const content = await zip.generateAsync({ type: "nodebuffer" });
    const zipFilePath = path.join(outputDir, "downloads.zip");
    fs.writeFileSync(zipFilePath, content);

    console.log("Archivos descargados y empaquetados correctamente.");
    res.download(zipFilePath, 'downloads.zip');
  } catch (error) {
    console.error("Error al descargar archivos:", error);
    res.status(500).json({ error: "Hubo un error interno" });
  }
};

export {
  addPictureDowloand,
  getAllPicturesDowloand,
  deleteAllPicturesDowloand,
  deletePictureDowloand,
  downloadAllFiles,
};
