import { NotFound } from '../lib/errors.js'
import Recipe from '../models/recipe.js'


async function recipeIndex (_req, res, next) {
  try {
    const recipes = await Recipe.find()
    return res.status(200).json(recipes)
  } catch (err) {
    next(err)
  }
}

async function recipeCreate (req, res, next) {
  try {
    const createdRecipes = await Recipe.create(req.body)
    return res.status(201).json(createdRecipes)
  } catch (err) {
    next(err)
  }
}

async function recipeShow (req, res, next) {
  const { recipeId } = req.params
  try {
    const shownRecipe = await Recipe.findById(recipeId)
    if (!shownRecipe) {
      throw new NotFound()
    }
    return res.status(200).json(shownRecipe)
  } catch (err) {
    next(err)
  }
}

export default {
  index: recipeIndex,
  create: recipeCreate,
  show: recipeShow,
}