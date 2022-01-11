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
      profileImage: 'https://res.cloudinary.com/dlqztlbrv/image/upload/v1641907448/ketokitchen-sei-project-3/35-350426_profile-icon-png-default-profile-picture-png-transparent_mhkjup.png',
      isAdmin: true,
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