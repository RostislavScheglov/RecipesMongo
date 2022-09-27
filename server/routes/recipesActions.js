import recipieModel from '../models/Recipe.js';
import mongoose from 'mongoose';
import { validationResult } from 'express-validator';

export const getAll = async (req, res) => {
    try{
        const recipes = await recipieModel.find().populate('author').exec();
        if(recipes !== null && recipes !== undefined){
           return res.send(recipes);
        }
        res.send('No recipes was found')
    }catch(err){
        console.log(err);
        res.status(400).json({
            message: 'Cant get recipes'
        })
    }
}

export const getFavourite = async (req, res) => {
    try{
        const recipes = await recipieModel.find({likedBy:{'$in':[req.userId]}}).populate('author').exec();
        if(recipes !== null && recipes !== undefined){
           return res.send(recipes);
        }
        res.send('No recipes was found')
    }catch(err){
        console.log(err);
        res.status(400).json({
            message: 'Cant get favourite recipes'
        })
    }
}

export const getBySearch = async (req, res) => {
    try{
        const recipes = await recipieModel.find({title: {'$regex': req.body.search}}).populate('author').exec();
        if(recipes !== null && recipes !== undefined){
           return res.send(recipes);
        }
        res.send('No recipes was found')
    }catch(err){
        console.log(err);
        res.status(400).json({
            message: 'Cant get favourite recipes'
        })
    }
}

export const getMyRecipes = async (req, res) => {
    try{
        const convertedId = mongoose.Types.ObjectId(req.userId);
        const recipes = await recipieModel.find({author: convertedId});
        if(recipes !== null && recipes !== undefined){
           return res.send(recipes);
        }
        res.send(recipes)
    }catch(err){
        console.log(err);
        res.status(400).json({
            message: 'Cant get my recipes'
        })
    }
}


export const getOne = async (req, res) => {
    try{
        recipieModel.findOneAndUpdate({
            _id: req.params.id
        },
        {
            $inc: {viewsCount: 1}
        },
        {
            returnDocument: 'after'
        },
        (err, doc)=>{
            if(err){
                console.log(err);
                return res.status(400).json({
                    message: 'Cant get recipie'
                })
            }
            if(!doc){
                return res.status(404).json({
                    message: 'Cant find recipie'
                })
            }
            res.send(doc);
        })
    }catch(err){
        console.log(err);
        res.status(500).json({
            message: 'Cant get recipie'
        })
    }
}

export const create = async (req, res) => {
    try{
        const errors = validationResult(req)
        if(!errors.isEmpty()){
            return res.status(400).json(errors);
        }
        const recipeExists = await recipieModel.findOne({title:req.body.title})
        if(recipeExists){
            return res.status(400).json({
                message: "Recipe with this title exists"
            })
        }
        const doc = new recipieModel({
            title: req.body.title,
            recipeImage: req.body.recipeImage,
            ingredients: req.body.ingredients,
            description: req.body.description,
            author: req.userId,  
        })
       const post = await doc.save();
       res.send(post);
    }catch(err){
        console.log(err);
        res.status(400).json({
            message: 'Cant create recipe'
        })
    }
}

export const remove = async (req, res) => {
    try{
        recipieModel.findOneAndDelete({_id: req.params.id},
            (err, doc) => {
                if(err){
                    console.log(err);
                    return res.status(400).json({
                        message: 'Cant delete recipie'
                    })
                }
                if(!doc){
                    return res.status(404).json({
                        message: 'Cant find recipie'
                    })
                }
            })
        res.send('Recipie was successfully deleted');
    }catch(err){
        console.log(err);
        res.status(400).json({
            message: 'Cant delete recipie'
        })
    }
}

export const update = async (req, res) => {
    try{
        recipieModel.findOneAndUpdate({_id: req.params.id},
            {
                title: req.body.title,
                recipeImage: req.body.recipeImage,
                ingredients: req.body.ingredients,
                description: req.body.description,
                $push: {likedBy: req.body.userId}, 
            },
            (err, doc) => {
                if(err){
                    console.log(err);
                    return res.status(400).json({
                        message: 'Cant update recipie'
                    })
                }
                if(!doc){
                    return res.status(404).json({
                        message: 'Cant find recipie'
                    })
                }
            })
        res.send('Recipie was successfully Updated');
    }catch(err){
        console.log(err);
        res.status(400).json({
            message: 'Cant update recipie'
        })
    }
}