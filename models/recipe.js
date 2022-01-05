import  mongoose  from 'mongoose'
import mongooseUniqueValidator from 'mongoose-unique-validator'

const recipeSchema = new mongoose.Schema({
  title: { type: String, required: true, unique: true },
  image: { type: String, required: true },
  prepTime: { type: Number, required: true },
  calories: { type: Number, required: true },
  macros: { type: String, required: true },
  ingredients: { type: String, required: true },
  preparation: { type: String, required: true },
})

recipeSchema.plugin(mongooseUniqueValidator)

const Recipe = mongoose.model('Recipe', recipeSchema)

export default Recipe