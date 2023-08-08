const express = require('express');
const { getActor, creatActor, removeActor, updateActor, getActorSearch } = require('../controllers/actor');


const router = express.Router();

router.get('/', getActor )
router.get('/search', getActorSearch )
router.post('/', creatActor )
router.patch('/:actorId',updateActor)
router.delete('/:actorId', removeActor)
 

module.exports = router;