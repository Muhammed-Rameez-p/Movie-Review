const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../models/user');
const { isValidObjectId } = require('mongoose');


exports.signin = async (req,res) => {
   const {email, password} = req.body;

    try {
        const existingUser = await User.findOne({email});
        
        if(!existingUser) return res.status(404).json({message:"user doesn't exist."})

        const isPasswordCorrect = await bcrypt.compare(password,existingUser.password);

        if(!isPasswordCorrect) return res.status(400).json({message:"invalid password."})

        const token = jwt.sign({email:existingUser.email,id:existingUser._id},'test',{expiresIn:'1h'});
        
        res.status(200).json({result:existingUser, token})
    } catch (error) {
        res.status(500).json({message:"something went wrong"});
    }
 }

 exports.signup = async (req,res) => {
    const { email,password,name } = req.body;

    try {

        const existingUser = await User.findOne({email});
        
        if(existingUser) return res.status(404).json({message:"user already exist."});

        const hashedPassword = await bcrypt.hash(password, 12);

        const result = await User.create({email,password: hashedPassword, name});

        const token = jwt.sign({email:result.email, id:result._id},'test');
        
        res.status(200).json({result, token});

        
    } catch (error) {

        res.status(500).json({message:"something went wrong"});
        
    }
 }

 exports.updateUser = async (req,res) => {
    const {userId} = req.params;
    const updateUser = req.body

    console.log(updateUser, 'bodyyyyyyyyyyyyy')

    if (!isValidObjectId(userId)) return  res.status(400).json({error:'Invalid request'});

    const newUser = await User.findByIdAndUpdate(userId, {...updateUser,userId}, {new:true});

    res.json(newUser);
 }

 exports.getSingleUser = async (req,res) =>{
    const { id } = req.params;

    try { 
       const NewSingleUser = await User.findById(id);

       res.status(200).json(NewSingleUser);
    } catch (error) {
        res.status(400).json({message:error.message});
    }
}


exports.followUser = async (req,res) =>{
    const { id } = req.params;
    const { value } = req.body;

    console.log(id, 'iddddddddddddddmmmmmmmmmmmmmmmmm')
    console.log(value, 'idddddddddddddd')

    try { 
       const user = await User.findById(id);

       const index = user.followers.findIndex((id) => id === value);

       if(index === -1) {
        user.followers.push(value);
       }else{
        user.followers = user.followers.filter((id) => id !== value);

       }

       const updateFollow = await User.findByIdAndUpdate(id, user, {new:true});

       res.status(200).json(updateFollow);
    } catch (error) {
        res.status(400).json({message:error.message});
    }
}

exports.getUsers = async (req,res) =>{
    try { 
       const NewUsers = await User.find();

       res.status(200).json(NewUsers);
    } catch (error) {
        res.status(400).json({message:error.message});
    }
}

exports.getFollowing = async (req,res) =>{
    const { id } = req.params;
    try { 
       

      const totalFollowing = await User.aggregate([
        {
            $match: {
              followers: {
                $elemMatch: {
                  $regex: id, // Use the provided search string for matching
                }
              }
            }
          },
         
      ]);


       res.status(200).json(totalFollowing);
    } catch (error) {
        res.status(400).json({message:error.message});
    }
}
