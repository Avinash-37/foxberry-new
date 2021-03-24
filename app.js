const express = require('express');
const path = require("path");
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require("cookie-parser");
const upload = require('express-fileupload');
const ENV = require('./env.json');

mongoose.Promise = global.Promise;
console.log("localhost");
url = `mongodb://localhost:27017/foxberry-new`;
mongoose.connect(url,{useNewUrlParser:true,useUnifiedTopology: true,useCreateIndex:true}).then(async (db) => {
    console.log('Connected to MongoDB server',url);
})
.catch((error) => {
    console.log('could not connect to MongoDB server',url);
});

// instantiate Express
const app = express();

// use middleware to serve static files in express js
app.use(express.static(path.join(__dirname,"views")));
//Serves all the request which includes /images in the url from Images folder
app.use(express.static(__dirname + '/public'))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(cookieParser());
app.set('view engine', 'ejs');
app.use(
    upload({
        useTempFiles: true,
        tempFileDir: '/tmp/',
    })
);
const home= require('./routes/index');
app.use("/",home);

app.use((req,res,next)=>{
    res.status(404).json({error:"File not found"});
})

let PORT=ENV.PORT;
// Start Server 
app.listen(PORT,(error)=>{
    if(error){
        console.log(error);
    }
    console.log(`Server Started on  ${PORT} Port`);
});