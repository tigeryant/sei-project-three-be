import express from 'express'
import recipes from '../controllers/recipes.js'
import auth from '../controllers/auth.js'
import secureRoute from '../lib/secureRoute.js'
import profile from '../controllers/profile.js'

const router = express.Router()

router.route('/recipes')
  .get(recipes.index)
  // .post(secureRoute, recipes.create)

router.route('/recipes/:recipeId')
  .get(recipes.show)
  // .put(secureRoute, recipes.update)
  // .delete(secureRoute, recipes.delete)
  // ADD FAVOURITES ROUTE HERE
  .post(secureRoute, recipes.toggleFavourite)

router.route('/recipes/:recipeId/comments')
  .post(secureRoute, recipes.commentCreate)

router.route('/recipes/:recipeId/comments/:commentId')
  .delete(secureRoute, recipes.commentDelete)

router.post('/register', auth.register)
router.post('/login', auth.login)

// profile
router.route('/profile/:userId')
  .get(profile.getProfileInfo)

router.route('/profile/:userId/favourites')
  .get(secureRoute, profile.getFavourites)


export default router