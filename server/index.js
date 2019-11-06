//Define Global variables
const app = express();
const PORT = process.env.PORT || 5000;

//Modules config
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose"); 
const methodOverride  = require("method-override");
const path = require("path");

//Mongoose models config



//Routes set-up
const indexRoutes = require("./routes/index");
const lecturerRoutes = require("./routes/lecturer/lecturer");
const userRoutes = require("./routes/user/user");
const courseRoutes = require("./routes/course/course");


//Application config
//extended: false
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(methodOverride("_method"));


//Mongoose config
let URL = process.env.DATABASEURL || "mongodb://localhost:27017/DL_platform";
//let url = process.env.DATABASEURL || "mongodb+srv://Admin:Admin@cluster0-te1xc.mongodb.net/DL_platform?retryWrites=true&w=majority";
mongoose.connect(URL, {useNewUrlParser: true, useUnifiedTopology: true});

//Serving static files generated by React.js
if(process.env.NODE_ENV==="production"){
    app.use(express.static("../client/build/"));
    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, "../client", "build", "index.html"));
    });
}

//Routes config
app.use(indexRoutes);
app.use(userRoutes);
app.use(courseRoutes);
app.use(lecturerRoutes);

//Express.js listening port
app.listen(PORT,()=> console.log("Server has started!"));