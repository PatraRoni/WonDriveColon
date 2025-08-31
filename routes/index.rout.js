const express = require('express');
const authMiddleeare = require('../middleware/auth')
const firebase = require('../config/firebase.config')

const router = express.Router()
const uplod = require('../config/multer.config')
const fileModel = require('../models/files.models')

router.get('/home', authMiddleeare, async (req,res) =>{

    const userFiles = await fileModel.find({
        user:req.user.userId
    })



    res.render('home',{files:userFiles})
})

router.post('/upload',authMiddleeare,uplod.single('file'), async (req,res) => {
    const newFile = await fileModel.create({
        path:req.file.path,
        originalname:req.file.originalname,  
        user:req.user.userId
    })
    res.json(newFile)
})

router.get('/download/:path',authMiddleeare,async(req,res)=>{

    const loggeedInUserId = req.user.userId;
    const path = req.params.path;

    const file = await fileModel.findOne({
        user:loggeedInUserId,
        path:path
    })
    if(!file){
        return res.status(401).json({
            message:'Unauthorized'
        })
    }

const signeUrl =await firebase.storage().bucket().file(path).getSignedUrl({
    action:'read',
    expires:Date.now()+ 60 * 1000 
})

res.redirect(signeUrl[0])

})


module.exports = router