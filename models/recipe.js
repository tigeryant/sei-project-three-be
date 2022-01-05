import  mongoose  from 'mongoose'
import mongooseUniqueValidator from 'mongoose-unique-validator'

const recipeSchema = new mongoose.Schema({
  course: { type: String, required: true },
  title: { type: String, required: true, unique: true },
  image: { type: String, required: true },
  prepTime: { type: Number, required: true },
  calories: { type: Number, required: true },
  protein: { type: Number, required: true },
  carbs: { type: Number, required: true },
  fats: { type: Number, required: true },
  ingredients: { type: String, required: true },
  preparation: { type: String, required: true },
})

recipeSchema.plugin(mongooseUniqueValidator)

const Recipe = mongoose.model('Recipe', recipeSchema)

export default Recipe