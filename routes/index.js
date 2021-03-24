const express = require('express');
const router = express();
const UploadedFiles = require("../Models/uploadedFiles");
var multer  =   require('multer');  

const storage = multer.diskStorage(
    {
        destination: function(req, file, cb)
        {
            cb(null, '../public/Images');
        },
        filename: function(req, file, cb)
        {
            cb(null, new Date().toISOString() + file.originalname);
        }
    });
    const upload = multer({storage: storage});
    
router.get('/', function(req, res) {
    console.log("route index called");
    res.render('pages/home');
});

router.get('/view', async(req, res)=> {
    console.log("route index called");
    try{
        let Allfiles = await UploadedFiles.find();
        console.log("file",Allfiles);
        res.render('pages/view',{Allfiles});
    }catch(error){
        console.log("error when view")
    }
});

router.get('/view-file', async(req, res)=> {
    console.log("route index called view-file",req.query);
    try{
        let Allfiles = await UploadedFiles.find({_id:req.query.id});
        console.log("file",Allfiles);
        res.render('pages/view-files',{Allfiles});
    }catch(error){
        console.log("error when view-file")
    }
});

router.post('/upload-files',upload.single('image'),function(req, res){
    console.log("route index called upload-files",req.files);
    console.log("route index called upload-files",req.files.image.name);
    let imageName = req.files.image.name;
    let uploadedFiles = new UploadedFiles({
                name:imageName,
                date:new Date()
            })
            uploadedFiles.save().then((response)=>{
                console.log("response",response);
                return res.render('pages/home');
            }).catch((error)=>{
                console.log("file",error);
            })
    // res.render('pages/home');
});

module.exports = router;