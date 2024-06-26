import Subida from '../Models/Subida.js'



const addPicture = async(req, res) => {
    try {
        const {image} = req.body;

        if(image && image.length > 0) {
            const newDowloands = await Promise.all(image.map(url => {
             return new Subida({
                image: url,
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

const getAllPictures = async(req, res) => {
    try {
        const allPictures = await Subida.find();
        res.status(200).json(allPictures)
    } catch (error) {
        res.status(500).json({error: 'No se ha encontrado la foto'})
    }
}

const getFilters = async(req, res) => {
    try {
        const temaFiltrado = req.query.tema 
        let filtro = {};

        if(temaFiltrado) {
            filtro = {tema: temaFiltrado}
        }

        const picturesFiltradas = await Subida.find(filtro)
        res.json(picturesFiltradas)
    } catch (error) {
        console.error('Error al obtener imágenes filtradas:', error);
        res.status(500).json({ error: 'Hubo un error interno' });
    }
}


const deletePicture = async (req, res) => {
    try {
        const pictureId = req.params.pictureId;
        const picture = await Subida.findById(pictureId);

        if (!picture) {
            return res.status(404).json({ error: 'La imagen no existe' });
        }

        await Subida.findByIdAndDelete(pictureId);

        res.status(200).json({ message: 'Imagen eliminada correctamente' });
    } catch (error) {
        console.error('Error al eliminar imagen:', error);
        res.status(500).json({ error: 'Hubo un error interno' });
    }
};

const deleteAllPictures = async(req, res) => {
    try {
        const SubidasEliminadas = await Subida.deleteMany()
        res.json(SubidasEliminadas)
    } catch (error) {
        
    }
}

export {
    addPicture,
    getAllPictures,
    getFilters,
    deletePicture,
    deleteAllPictures
}