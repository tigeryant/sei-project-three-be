import { NotFound, Unauthorized } from '../lib/errors.js'
import Recipe from '../models/recipe.js'



async function recipeIndex (_req, res, next) {
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

export default {
  index: recipeIndex,
  // create: recipeCreate,
  show: recipeShow,
  // update: recipeEdit,
  // delete: recipeDelete,
  commentCreate: recipeCommentCreate,
  commentDelete: recipeCommentDelete,
}