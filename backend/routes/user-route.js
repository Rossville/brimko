const express = require('express');
const isUserAuthenticated = require('../middleware/userAuthenticated.js');
const {createUser, loginUser, findUser, getAllUser} = require('../controller/userController.js');
const {generateToken, verifyToken} = require('../middleware/tokenVerification.js');
const { createPost, showPost, showAllPost } = require('../controller/postController.js');
const { sendFollow } = require('../controller/followController.js');
const router = express.Router();

router.use(express.json());
router.post('/signup', isUserAuthenticated, generateToken, createUser);
router.post('/login', generateToken, loginUser);
router.get('/:id', findUser);
router.post('/post/create', verifyToken, createPost);
router.get('/post/:id', verifyToken, showPost);
router.post('/posts', verifyToken, showAllPost); // this should work with GET request but it is not working, instead it returing a 404 on send request in GET format
router.post('/people', verifyToken, getAllUser);
router.post('/follow/:id', verifyToken, sendFollow);

module.exports = router;