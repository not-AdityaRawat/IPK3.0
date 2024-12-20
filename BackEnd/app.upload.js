import uploadNotes from "./multer.upload.js"; //adjust the path accordingly
import uploadToDrive from "./google.js"; //adjust the path accordingly
import cors from "cors";
import express from "express";
import client,{ saveToDB  } from "./Model/db.js"; //adjust the path

const app = express();
const port = process.env.PORT || 4000;


app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);


app.use(express.json());

// HANDLE NOTES SUBMIT to google drive
app.post("/contribute", uploadNotes.single("notes"), async (req, res) => {
  try {
    const fileName = req.file.originalname;
    const filePath = req.file.path;
    console.log(fileName +'and '+filePath)
    // Upload file to Google Drive
    const driveResponse = await uploadToDrive(filePath, fileName);
    const fileUrl = `https://drive.google.com/file/d/${driveResponse.id}/view`;
  
    // Return the file URL to frontend
    res.status(200).json({
      message: "File Uploaded Successfully to Google Drive",
      fileUrl,
    });
  } catch (err) {
    res.status(500).json({
      message: "Error Found while uploading: ",
      error: err.message,
    });
  }
});


//HADNLE FORM SUBMIT
app.post("/contribute/submit", async (req, res) => {
  try {
    const { title, uploadedBy, embeded, subjectname, unitname } = req.body;
    // const uniqueSubjectName = subjectname+` ${Date.now()}`;
    const newFile = {
      id: Date.now(),
      title,
      upvotes: 0,
      uploadedBy,
      embeded,
      subjectname,
      unitname,
      isValid: true,
    };

    // Save to MongoDB using the saveToDB function
    const response = await saveToDB(newFile);

    res.status(200).json({
      message: "Note details successfully saved to MongoDB!",
      response,
    });
  } catch (err) {
    res.status(500).json({
      message: "Error while saving note details",
      error: err.message,
    });
  }
});



//SET THE NOTES IN DESCENDING ORDER OF THEIR UPVOTES
app.get("/units", async (req, res) => {
  try {
    await client.connect();
    const database = client.db("notesDB");
    const collection = database.collection("notes");

    // Sort the data in descending order of upvotes
    const sortData = await collection
      .find() // Fetch all documents
      .sort({ upvotes: -1 }) // Sort by upvotes in descending order
      .toArray(); // Convert to an array
      console.log(sortData)
    res.status(200).json(sortData);
  } catch (err) {
    res.status(500).json({ message: "Error fetching notes", error: err.message });
  } finally {
    await client.close();
  }
});



//UPDATES UPVOTES
app.put("/contribute/upvote/:id", async (req, res) => {
  try {
    const { id } = req.params; // Get the ID from the URL
    const { increment } = req.body;

    console.log("Upvote Request Received:", { id, increment });

    await client.connect();
    const database = client.db("notesDB");
    const collection = database.collection("notes");

    // Check if the document exists first
    const unit = await collection.findOne({ id: parseInt(id) });
    if (!unit) {
      return res.status(404).json({ message: "Note not found" });
    }

    // Update the upvotes
    const result = await collection.updateOne(
      { id: parseInt(id) },
      { $inc: { upvotes: increment || 1 } }
    );

    console.log("Database Update Result:", result);

    if (result.modifiedCount === 0) {
      res.status(404).json({ message: "Note not found" });
    } else {
      res.status(200).json({
        message: "Upvotes successfully updated",
        updatedCount: result.modifiedCount,
      });
    }
  } catch (err) {
    console.error("Error updating upvotes:", err.message);
    res.status(500).json({
      message: "Error updating upvotes",
      error: err.message,
    });
  } finally {
    await client.close();
  }
});


app.get('/Leaderboard', async (req, res) => {
  try {
    await client.connect();
    const database = client.db("notesDB");
    const collection = database.collection("notes");

    const options = {
      projection: { _id: 0, uploadedBy: 1 }
    };

    // Get all uploads
    const uploads = await collection.find({}, options).toArray();

    // Extract uploadedBy values
    const value = uploads.map(i => i.uploadedBy);

    // Filter out 'admin' contributors
    const contributors = value.filter(uploader => uploader !== 'admin');


    // Count the number of contributions per contributor
    const contributionCount = contributors.reduce((acc, contributor) => {
      if (!acc[contributor]) {
        acc[contributor] = 1;  // Initialize count for new contributor
      } else {
        acc[contributor] += 1; // Increment count for existing contributor
      }
      return acc;
    }, {});
    
    //Arranging contributers as per the highest contribution first
    const order = Object.entries(contributionCount).sort((a,b)=>b[1]-a[1]);
    console.log(order)
    
    
    const backtoObj = Object.fromEntries(order)
    // Send the resulting JSON response
    res.json(backtoObj);


  } catch (err) {
    console.log("Error fetching uploaders:", err.message);
    res.status(500).send("Internal Server Error");
  }
});


//Server starts here
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});