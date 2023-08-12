const protectedRoute = require('../middleware/VerifyJWT')

module.exports = app => {
    const user = require("../controllers/user.controller.js");
  
    var router = require("express").Router();
  
    // Create a new Tutorial
    // console.log("i am here")
    router.post("/signup", user.create);
  
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