import Recipe from '../models/recipe.js'
import recipeData from './data/recipes.js'
import { connectDb, disconnectDb, truncateDb } from './helpers.js'
import User from '../models/user.js'

async function seed() {
  try {
    await connectDb()
    console.log('🤖 Database Connected')

    await truncateDb()
    console.log('🤖 Database Dropped')

    const user = await User.create({
      firstName: 'john',
      lastName: 'smith',
      email: 'admin@email.com',
      username: 'admin',
      password: 'pass',
      passwordConfirmation: 'pass',
      profileImage: 'https://res.cloudinary.com/dlqztlbrv/image/upload/v1641490303/ketokitchen-sei-project-3/tvciqususmfbud2sh1ex.jpg',
      isAdmin: true,
      // INITIALISE THE ADMIN WITH AN EMPTY FAVOURITES ARRAY
    })

    console.log('🤖 Admin user created')

    // remove later
    recipeData.forEach(fav => {
      fav.addedBy = user
    })

    const recipe = await Recipe.create(recipeData)
    console.log(`🤖 ${recipe.length} Recipe added to the database`)
    console.log('Good bye')
  } catch (err) {
    console.log('🤖 Something went wrong')
    console.log(err)
  }
  disconnectDb()
}

seed()