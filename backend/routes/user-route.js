const express = require('express');
const isUserAuthenticated = require('../middleware/userAuthenticated.js');
const {createUser, loginUser, findUser} = require('../controller/userController.js');
const {generateToken, verifyToken} = require('../middleware/tokenVerification.js');
const { createPost, showPost, showAllPost } = require('../controller/postController.js');
const router = express.Router();

router.use(express.json());
router.post('/signup', isUserAuthenticated, generateToken, createUser);
router.post('/login', loginUser, generateToken, function(req, res){
    try{
        return res.status(200).json({
            msg: "User Found"
        });
    }
    catch(err){
        return res.status(500).json({
            msg: "Interal server error"
        })
    }
});
router.get('/:id', findUser);
router.post('/post/create', verifyToken, createPost);
router.get('/post/:id', verifyToken, showPost);
router.post('/posts', verifyToken, showAllPost); // this should work with GET request but it is not working, instead it returing a 404 on send request in GET format

module.exports = router;