import {ref, getDownloadURL, uploadBytesResumable} from 'firebase/storage'
import {storage} from '../firebase.js'
import sharp from 'sharp'

export async function uploadFile (file, folder, storageInstance) {
    let fileBuffer = await sharp(file.buffer).resize({quality: 90, progressive: true }).toBuffer()

    const fileRef = ref(storage, `${folder}/${file.originalname + '' + Date.now()}`); // Cambia el nombre de la carpeta a 'downloads'

    const fileMetaData = {
        contentType: file.mimetype
    }

    const fileUploadPromise = uploadBytesResumable(
        fileRef,
        fileBuffer,
        fileMetaData
    )

    await fileUploadPromise

    const fileDowloandURL = await getDownloadURL(fileRef)

    return {ref: fileRef, dowloandURL: fileDowloandURL}
}