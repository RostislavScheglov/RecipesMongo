import mongoose from 'mongoose';

const RecipeSchema = new mongoose.Schema({
    title:{ type: String, required: true, unique: true},
    recipeImage:{type: String},
    ingredients: {type: Array, required: true},
    description: {type: String, required: true},
    viewsCount: {type: Number, default: 0},
    likesCount: {type: Number, default: 0},
    category: {type: String},
    likedBy: { type: Array, default:[]},
    author: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
},
{
    timestamps: true
});

export default mongoose.model('Recipie', RecipeSchema);