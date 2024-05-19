// util/UploadFile.js
import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({ 
    cloud_name: "dyijnjd5t", 
    api_key: "698963257989265", 
    api_secret: "mIfMkbJQQTQ0Yw4RvPdkdE1V_LQ" 
});


const uploadFile = (filePath) => {
    return new Promise((resolve, reject) => {
        cloudinary.uploader.upload(filePath, (error, result) => {
            if (error) reject(error);
            else resolve(result);
        });
    });
};

export { uploadFile };




   

    