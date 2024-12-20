import { google } from "googleapis";
import fs from 'fs';
import dotenv from 'dotenv'
dotenv.config()

const KEYFILE_PATH = process.env.GOOGLE_API_PATH; // You can take this from Google Cloud Console
const FOLDER_ID = process.env.FOLDER_ID; // THis is the id of folder in google drive where you want to upload 

const auth = new google.auth.GoogleAuth({
    keyFile: KEYFILE_PATH,
    scopes: ['https://www.googleapis.com/auth/drive.file'],
});

const drive = google.drive({
    version: 'v3',
    auth,
});

const uploadToDrive = async (filePath, fileName) => {
    try {
        const uniquefilename= fileName+`${Date.now()}`
        // Define metadata for the file to be uploaded
        const fileMetadata = {
            name: uniquefilename,
            parents: [FOLDER_ID],
        };

        const media = {
            mimetype: 'application/octet-stream',
            body: fs.createReadStream(filePath), // Read file as stream
        };

        // Upload file to Google Drive
        const response = await drive.files.create({
            requestBody: fileMetadata,
            media: media,
            fields: 'id',
        });

        console.log('File Uploaded Successfully. File ID:', response.data.id);

        // Delete the local file after upload
        await fs.promises.unlink(filePath);
        return response.data;
    } catch (err) {
        console.error('Error uploading to Google Drive:', err.message);
        // Clean up by deleting the file even if the upload fails
        await fs.promises.unlink(filePath);
        throw err; // Re-throw error after cleanup
    }
};

export default uploadToDrive;
