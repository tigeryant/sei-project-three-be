import Recipe from '../models/recipe.js'
import recipeData from './data/recipes.js'
import { connectDb, disconnectDb, truncateDb } from './helpers.js'

async function seed() {
  try {
    await connectDb()
    console.log('🤖 Database Connected')

    await truncateDb()
    console.log('🤖 Database Dropped')

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