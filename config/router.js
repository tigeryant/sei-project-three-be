import express from 'express'
import recipes from '../controllers/recipes.js'

const router = express.Router()

router.route('/recipes')
  .get(recipes.index)
  .post(recipes.create)

router.route('/recipes/:recipeId')
  .get(recipes.show)


export default router