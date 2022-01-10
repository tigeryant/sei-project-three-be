import User from '../models/user.js'

async function getProfileInfo(req, res, next) {
  try {
    const { userId } = req.params
    const user = await User.findById(userId).populate('favouriteRecipes')
    return res.status(200).json(user)
  } catch (err) {
    next(err)
  }
}

async function getFavourites(req, res, next) {
  const { currentUserId } = req
  try {
    const user = await User.findById(currentUserId).populate('favouriteRecipes')
    const favouriteRecipes = user.favouriteRecipes
    return res.status(200).json(favouriteRecipes)
  } catch (err) {
    next(err)
  }
}

export default {
  getProfileInfo: getProfileInfo,
  getFavourites: getFavourites,
}