const express = require('express');
const { signin, signup, updateUser, getSingleUser, followUser, getUsers, getFollowing } = require('../controllers/user');



const router = express.Router();


router.get('/', getUsers )
router.post('/signin' , signin );
router.post('/signup' , signup );
router.post('/:userId',updateUser);
router.get('/:id', getSingleUser );
 
router.post('/:id/follow', followUser  );
router.get('/:id/following', getFollowing  );


module.exports = router;