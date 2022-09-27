import { body } from 'express-validator';

export const registrValidation = [
    body('userEmail', 'Bad email format').isEmail(),
    body('userName', 'Username length should be minimum 2 symbols').isLength({min:2}),
    body('userPassword', 'Password length should be minimum 4 symbols').isLength({min:4}),
]
export const loginValidation = [
    body('userEmail', 'Bad email format').isEmail(),
    body('userPassword', 'Password length should be minimum 4 symbols').isLength({min:4}),
]
export const recipeValidation = [
    body('title', 'Title length should be minimum 3 symbols').isLength({min:3}),
    body('recipeImage', 'Bad link to the image').optional().isURL(),
    body('ingredients', '1 ingredient is minimum').isLength({min:1}),
    body('description', 'Bad description format').isString(),
]