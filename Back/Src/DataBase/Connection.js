//Connecting The server with MongoDB in the cloud, using their tool, Mongoose
const mongoose = require("mongoose");

//Custom access code to the DB
const uro = "mongodb+srv://aserrods:Zuy2V1xK8M362G2k@cluster0.yxtkaek.mongodb.net/42i_MondoDB?retryWrites=true&w=majority&appName=Cluster0"
const uri = "mongodb+srv://ImperialUser:A159753eW@cluster0.sh4t9uz.mongodb.net/42i_MondoDB?retryWrites=true&w=majority&appName=Cluster0";

const db = mongoose.connection;

//Connections Settings
if (!uri) {
    throw new Error("Error Code: grx30xd33d");
}

let cached = global.mongoose;
if (!cached) {
    cached = global.mongoose = { conn: null, promise: null };
}

const opts = {
    bufferCommands: false,
    maxPoolSize: 500,
    wtimeoutMS: 2500,
};

mongoose.set('strictQuery', true);

mongoose.connect(uri, opts);

//If connection is sucessful, show it console
db.once("open", _ => {
    console.log("Database is connected to ", uri);
})
//Otherway, throw an error
db.on("error", (error) => {
    console.log(error);
})