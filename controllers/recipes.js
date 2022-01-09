import { NotFound, Unauthorized } from '../lib/errors.js'
import Recipe from '../models/recipe.js'
import User from '../models/user.js'

async function recipeIndex(_req, res, next) {
  try {
    const recipes = await Recipe.find()
    return res.status(200).json(recipes)
  } catch (err) {
    next(err)
  }
}

// async function recipeCreate (req, res, next) {
//   try {
//     const createdRecipes = await Recipe.create(req.body)
//     return res.status(201).json(createdRecipes)
//   } catch (err) {
//     next(err)
//   }
// }

async function recipeShow(req, res, next) {
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

// async function recipeEdit(req, res, next) {
//   const { recipeId } = req.params
//   const { currentUserId } = req
//   try {
//     const recipeToUpdate = await Recipe.findById(recipeId)
//     if (!recipeToUpdate) {
//       throw new NotFound()
//     }
//     if (!recipeToUpdate.addedBy.equals(currentUserId)) {
//       throw new Unauthorized()
//     }
//     Object.assign(recipeToUpdate, req.body)
//     await recipeToUpdate.save()
//     return res.status(202).json(recipeToUpdate)
//   } catch (err) {
//     next(err)
//   }
// }

// async function recipeDelete(req, res, next) {
//   const { recipeId } = req.params
//   const { currentUserId } = req
//   try {
//     const recipeToDelete = await Recipe.findById(recipeId)
//     if (!recipeToDelete) {
//       throw new NotFound()
//     }
//     if (!recipeToDelete.addedBy.equals(currentUserId)) {
//       throw new Unauthorized()
//     }
//     await recipeToDelete.remove()
//     return res.sendStatus(204)
//   } catch (err) {
//     next(err)
//   }
// }

async function recipeCommentCreate(req, res, next) {
  const { recipeId } = req.params
  const { currentUser } = req
  try {
    const commentedRecipe = await Recipe.findById(recipeId)
    if (!commentedRecipe) {
      throw new NotFound()
    }
    const createdComment = commentedRecipe.comments.create({ ...req.body, addedBy: currentUser })
    commentedRecipe.comments.push(createdComment)
    await commentedRecipe.save()
    return res.status(201).json(createdComment)
  } catch (err) {
    next(err)
  }
}

async function recipeCommentDelete(req, res, next) {
  const { recipeId, commentId } = req.params
  const { currentUserId } = req
  try {
    const recipe = await Recipe.findById(recipeId)
    if (!recipe) {
      throw new NotFound()
    }
    const commentToDelete = recipe.comments.id(commentId)
    if (!commentToDelete) {
      throw new NotFound()
    }
    if (!commentToDelete.addedBy.equals(currentUserId)) {
      throw new Unauthorized()
    }
    commentToDelete.remove()
    await recipe.save()
    return res.sendStatus(204)
  } catch (err) {
    next(err)
  }
}

// ADD A NEW FUNCTION CALLED addFavourite
async function addFavourite(req, res, next) {
  // find the recipe (specified by req.params)
  // find the user based on req
  const { recipeId } = req.params
  const { currentUser } = req // , currentUserId

  // req.currentUser = user
  // req.currentUserId = user._id

  // console.log('req.headers: ', req.headers)
  console.log('trying to add favourite')
  try {
    const favouritedRecipe = await Recipe.findById(recipeId)
    if (!favouritedRecipe) {
      console.log('throw not found 1')
      throw new NotFound()
    }

    // const currentUser = await User.findById(currentUserId)
    // if (!currentUser) {
    //   console.log('throw not found 2')
    //   throw new NotFound()
    // }

    currentUser.favourites.forEach(currentFavouriteId => {
      if (favouritedRecipe._id.equals(currentFavouriteId)) {
        console.log('throw unauthorized')
        throw new Unauthorized()
      }
    })

    currentUser.favourites.push(favouritedRecipe._id)
    await currentUser.save()
    return res.status(201).json(currentUser)
  } catch (err) {
    console.log('causing error')
    next(err)
  }
}

export default {
  index: recipeIndex,
  // EXPORT THE addFavouriteFUNCTION
  addFavourite: addFavourite,
  // create: recipeCreate,
  show: recipeShow,
  // update: recipeEdit,
  // delete: recipeDelete,
  commentCreate: recipeCommentCreate,
  commentDelete: recipeCommentDelete,
}