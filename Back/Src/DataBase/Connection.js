const mongoose = require("mongoose");

const uri = "mongodb+srv://ImperialUser:A159753eW@cluster0.sh4t9uz.mongodb.net/42i_MondoDB?retryWrites=true&w=majority&appName=Cluster0";
const db = mongoose.connection;

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

db.once("open", _ => {
    console.log("Database is connected to ", uri);
})

db.on("error", (error) => {
    console.log(error);
})