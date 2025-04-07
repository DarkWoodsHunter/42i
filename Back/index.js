require("./Src/DataBase/Connection.js");
const app = require("./Src/App.js");

app.listen(app.get("port"), () => {
    console.log("Server on port ", app.get("port"))
})