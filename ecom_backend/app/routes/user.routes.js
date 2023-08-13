const protectedRoute = require('../middleware/VerifyJWT')

module.exports = app => {
    const user = require("../controllers/user.controller.js");
    const multer = require('multer');
    var router = require("express").Router();

    // file upload
    const storage = multer.diskStorage({
    destination:'./upload/users',
        filename:(req, file, cb) => {
            cb(null, `${file.originalname}`)
      }
    })
    const upload = multer({
      storage:storage,
      limits:{fileSize:5000000}
    })
    // User can only upload profile picture upto 5 MB
    function checkFileSize(err, req, res, next)
    {
        if (err instanceof multer.MulterError){
            res.json({
                isSuccess:0,
                message:err.message
            })
            return
        }
        next()
    }
    router.post("/signup", upload.single('profile'), checkFileSize, user.create);
  
    // // Retrieve all Tutorials
    router.get("/getUsers", protectedRoute, user.getAllUsers);
    router.post("/login", user.login)
  
    // // Retrieve all published Tutorials
    // router.get("/published", tutorials.findAllPublished);
  
    // // Retrieve a single Tutorial with id
    // router.get("/:id", tutorials.findOne);
  
    // // Update a Tutorial with id
    // router.put("/:id", tutorials.update);
  
    // // Delete a Tutorial with id
    // router.delete("/:id", tutorials.delete);
  
    // // Delete all Tutorials
    // router.delete("/", tutorials.deleteAll);
  
    app.use('/api', router);
  };