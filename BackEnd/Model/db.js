import { MongoClient, ServerApiVersion } from "mongodb";

const uri =
  "Create your MongoDB Server and paste the URI here";

// Create a MongoClient instance
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});


// Function to save notes data into MongoDB
export async function saveToDB(noteData) {
  try {
    await client.connect();

    const database = client.db("notesDB");
    const collection = database.collection("notes");

    const result = await collection.insertOne(noteData);
    console.log("Note successfully added to MongoDB:", result.insertedId);
    return result;
  } catch (error) {
    console.error("Error saving data to MongoDB:", error.message);
    throw error;
  } finally {
    await client.close(); // Close the client after operations
  }
}

export default client;

