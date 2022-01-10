import mongoose from 'mongoose'
import mongooseUniqueValidator from 'mongoose-unique-validator'

const commentSchema = new mongoose.Schema({
  text: { type: String, required: true, maxlength: 200 },
  rating: { type: Number, required: true, min: 1, max: 5 },
  addedBy: { type: mongoose.Schema.ObjectId, ref: 'User', required: true },
}, {
  timestamps: true,
})

const recipeSchema = new mongoose.Schema({
  course: { type: String, required: true },
  title: { type: String, required: true, unique: true },
  image: { type: String, required: true },
  prepTime: { type: Number, required: true },
  calories: { type: Number, required: true },
  protein: { type: Number, required: true },
  carbs: { type: Number, required: true },
  fats: { type: Number, required: true },
  ingredients: { type: Array, required: true },
  preparation: { type: Array, required: true },
  comments: [commentSchema],

  // we can remove these two fields and what it relates to in seeds.js
  addedBy: { type: mongoose.Schema.ObjectId, ref: 'User', required: true },
  favouritedBy: [{ type: mongoose.Schema.ObjectId, ref: 'User', required: true }], // important
})

recipeSchema.plugin(mongooseUniqueValidator)

recipeSchema.set('toJSON', { virtuals: true }) // what does this do?

const Recipe = mongoose.model('Recipe', recipeSchema)

export default Recipe