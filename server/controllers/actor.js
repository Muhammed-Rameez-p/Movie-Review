const { isValidObjectId } = require('mongoose');
const Actor = require('../models/actor')

exports.getActor = async (req,res) =>{
    try { 
       const NewActor = await Actor.find();

       res.status(200).json(NewActor);
    } catch (error) {
        res.status(400).json({message:error.message});
    }
}

exports.getActorSearch = async (req,res) =>{
    const searchQuery = req.query.searchQuery;

    try { 
      const name = new RegExp(searchQuery, 'i');

       const NewActor = await Actor.find({name});

       res.status(200).json({data: NewActor});
    } catch (error) {
        res.status(400).json({message:error.message});
    }
}

exports.creatActor = async (req,res) =>{
    const body = req.body;
 
    const NewActor = new Actor(body);
     try {
        await NewActor.save();
 
        res.status(200).json(NewActor);
     } catch (error) {
         res.status(400).json({message:error.message});
     }
 }       

 exports.removeActor = async (req, res) => {
    const { actorId } = req.params;
  
    if (!isValidObjectId(actorId)) return  res.status(400).json({error:'Invalid request'}); 
  
  
    await Actor.findByIdAndDelete(actorId);
  
    res.json({ message: "Record removed successfully." });
  };

  exports.updateActor = async (req,res) => {
     const {actorId} = req.params;
     const actor = req.body

     if (!isValidObjectId(actorId)) return  res.status(400).json({error:'Invalid request'});

     const newActor = await Actor.findByIdAndUpdate(actorId, {...actor,actorId}, {new:true});

     res.json(newActor);
  }

  