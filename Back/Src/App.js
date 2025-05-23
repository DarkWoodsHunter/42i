const express = require("express")
const app = express();
const router = require("../Src/Routes/Api.routes");
const cors = require("cors");

//Variable with the Allowed links that the server can interact
const allowedOrigins = [
    "http://localhost:3001",
    "http://localhost:3000",
];

//Cors settings
const credentials = (req, res, next) => {
    const origin = req.headers.origin;
    if (allowedOrigins.includes(origin)) {
        res.header("Access-Control-Allow-Credentials", true);
    }
    next()
}
app.use(credentials)
app.use(cors({
    origin: function (origin, callback) {
        if (!origin) return callback(null, true); if (allowedOrigins.indexOf(origin) === -1) {
            var msg = 'The CORS policy for this site does not ' +
                'allow access from the specified Origin.';
            return callback(new Error(msg), false);
        } return callback(null, true);
    }
}))

//Server Settings
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

//Default port for the server
app.set("port", 3001)
app.use(router)


module.exports = app;