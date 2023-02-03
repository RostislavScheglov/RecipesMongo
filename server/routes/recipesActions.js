import recipeModel from '../models/Recipe.js'
import mongoose from 'mongoose'
import { validationResult } from 'express-validator'
import fs from 'fs'
import { upload } from '../index.js'

// app.post('/upload', upload.single('img'), (req, res)=>{
//     res.json({
//         url: `/uploads/${req.file.filename}`
//     })
// })

// app.delete('/upload', (req, res) => {
//   fs.unlink(`./${req}`, (err) => {
//     console.log(err)
//   })
//   res.json({
//     url: 'successss',
//   })
// })

export const deleteImg = async (req, res) => {
  const path = req.params.path
  const id = req.params.id
  fs.unlink(path + `/${id}`, (err) => {
    console.log(err)
  })
  res.send({
    url: 'Success',
  })
}

export const getAll = async (req, res) => {
  try {
    const recipes = await recipeModel.find().populate('author').exec()
    if (recipes !== null && recipes !== undefined) {
      return res.send(recipes)
    }
    res.send('No recipes was found')
  } catch (err) {
    res.status(400).json({
      message: 'Cant get recipes',
    })
  }
}

export const getFavourite = async (req, res) => {
  try {
    const recipes = await recipeModel
      .find({ likedBy: { $in: [req.userId] } })
      .populate('author')
      .exec()
    if (recipes !== null && recipes !== undefined) {
      return res.send(recipes)
    }
    res.send('No recipes was found')
  } catch (err) {
    console.log(err)
    res.status(400).json({
      message: 'Cant get favourite recipes',
    })
  }
}

export const getBySearch = async (req, res) => {
  try {
    const recipes = await recipeModel
      .find({ title: { $regex: req.body.search } })
      .populate('author')
      .exec()
    if (recipes !== null && recipes !== undefined) {
      return res.send(recipes)
    }
    res.send('No recipes was found')
  } catch (err) {
    console.log(err)
    res.status(400).json({
      message: 'Cant get favourite recipes',
    })
  }
}

export const getMyRecipes = async (req, res) => {
  try {
    const convertedId = mongoose.Types.ObjectId(req.userId)
    const recipes = await recipeModel.find({ author: convertedId })
    if (recipes !== null && recipes !== undefined) {
      return res.status(200).send(recipes)
    }
  } catch (err) {
    console.log(err)
    res.status(400).json({
      message: 'Cant get my recipes',
    })
  }
}

export const getOne = async (req, res) => {
  try {
    recipeModel.findOneAndUpdate(
      {
        _id: req.params.id,
      },
      {
        $inc: { viewsCount: 1 },
      },
      {
        returnDocument: 'after',
      },
      (err, doc) => {
        if (err) {
          console.log(err)
          return res.status(400).json({
            message: 'Cant get recipe',
          })
        }
        if (!doc) {
          return res.status(404).json({
            message: 'Cant find recipe',
          })
        }
        res.send(doc)
      }
    )
  } catch (err) {
    res.status(500).json({
      message: 'Cant get recipe',
    })
  }
}

export const create = async (req, res) => {
  try {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json(errors)
    }
    const recipeExists = await recipeModel.findOne({ title: req.body.title })
    if (recipeExists) {
      return res.status(400).json({
        message: 'Recipe with this title exists',
      })
    }
    const doc = new recipeModel({
      title: req.body.title,
      recipeImage: null,
      ingredients: req.body.ingredients,
      description: req.body.description,
      author: req.userId,
    })
    const post = await doc.save()
    res.send(post)
  } catch (err) {
    console.log(err)
    res.status(400).json({
      message: 'Cant create recipe',
    })
  }
}

export const uploadUrl = async (req, res) => {
  const imgUrl = req.files.img[0].path.replace('\\', '/')
  recipeModel.findOneAndUpdate(
    { _id: req.body.id },
    {
      recipeImage: imgUrl,
    },
    (err, doc) => {
      if (err) {
        console.log(err)
        return res.status(400).json({
          message: 'Cant update imgUrl',
        })
      }
      if (!doc) {
        return res.status(404).json({
          message: 'Cant find recipe',
        })
      }
    }
  )
  res.send('Img Uploaded successfull')
}

//refactore remove (we have c)
export const remove = async (req, res) => {
  try {
    recipeModel.findOneAndDelete({ _id: req.params.id }, (err, doc) => {
      if (!doc) {
        return res.status(404).json({
          message: 'Cant find recipe',
        })
      }
    })
    res.send('Recipe was successfully deleted')
  } catch (err) {
    res.status(400).json({
      message: 'Cant delete recipe',
    })
  }
}

export const update = async (req, res) => {
  try {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json(errors.array())
    }
    recipeModel.findOneAndUpdate(
      { _id: req.params.id },
      {
        title: req.body.title,
        ingredients: req.body.ingredients,
        description: req.body.description,
        $push: { likedBy: req.body.userId },
      },
      (err, doc) => {
        if (!doc) {
          return res.status(404).json([
            {
              msg: 'Cant find recipe',
            },
          ])
        }
      }
    )
    res.send('Recipe was successfully Updated')
  } catch (err) {
    res.status(400).json([
      {
        message: 'Cant update recipe',
      },
    ])
  }
}

export const likeDislike = async (req, res) => {
  try {
    if (req.body.liked) {
      recipeModel.updateOne(
        { _id: req.params.id },
        {
          $push: { likedBy: req.body.userId },
        },
        (err, doc) => {
          if (!doc) {
            return res.status(404).json({
              message: 'Cant find recipe',
            })
          }
        }
      )
      res.status(200).json({
        msg: 'Added to fav',
      })
    } else {
      recipeModel.updateOne(
        { _id: req.params.id },
        {
          $pull: { likedBy: req.body.userId },
        },
        (err, doc) => {
          if (!doc) {
            return res.status(404).json({
              message: 'Cant find recipe',
            })
          }
        }
      )
      res.status(200).json({
        msg: 'Deleted from fav',
      })
    }
  } catch (err) {
    res.status(400).json({
      message: 'Cant update recipe',
    })
  }
}
