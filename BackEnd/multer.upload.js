import multer from 'multer'
import {fileURLToPath} from 'url'
import path from 'path'

//we have to define __dirname as it not defined in commonJS
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const uploadPath = path.join(__dirname,'temp')

//setting multer storage configuration
const storage = multer.diskStorage({
    destination: (res,file,cb)=>{
        cb(null, uploadPath)
    },
    filename: (res, file, cb)=>{
        const uniqueName= Date.now()+"-"+Math.round(Math.random()*1E9);
        cb(null, uniqueName)
    }
});
 
const uploadNotes = multer({
    limits: { fileSize: 30 * 1024 * 1024 },
    storage:storage
});
export default uploadNotes;