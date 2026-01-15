// ============================================
// API.JS - SERVICE LAYER (DATA ACCESS)
// ============================================

const API_BASE_URL = "http://localhost:3000/api/recipes"

// ============================================
// GET ALL RECIPES
// ============================================
export const getAllRecipes = async () => {
  try {
    const response = await fetch(API_BASE_URL)

    if (!response.ok) {
      throw new Error(`Erreur HTTP: ${response.status}`)
    }

    const recipes = await response.json()
    return recipes
  } catch (error) {
    console.error("Erreur lors de la récupération des recettes:", error)
    throw error
  }
}

// ============================================
// CREATE A NEW RECIPE
// ============================================
export const createRecipe = async (recipeData) => {
  try {
    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(recipeData),
    }

    const response = await fetch(API_BASE_URL, options)

    if (!response.ok) {
      throw new Error(`Erreur HTTP: ${response.status}`)
    }

    const newRecipe = await response.json()
    return newRecipe
  } catch (error) {
    console.error("Erreur lors de la création de la recette:", error)
    throw error
  }
}

// ============================================
// GET ONE RECIPE
// ============================================
export const getOneRecipe = async (recipeId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/${recipeId}`)

    if (!response.ok) {
      throw new Error(`Erreur HTTP: ${response.status}`)
    }

    const recipe = await response.json()
    return recipe
  } catch (error) {
    console.error("Erreur lors de la récupération de la recette:", error)
    throw error
  }
}

// ============================================
// DELETE ONE RECIPE
// ============================================
export const deleteOneRecipe = async (recipeId) => {
  try {
    const options = {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    }

    const response = await fetch(`${API_BASE_URL}/${recipeId}`, options)

    if (!response.ok) {
      throw new Error(`Erreur HTTP: ${response.status}`)
    }

    const result = await response.json()
    return result
  } catch (error) {
    console.error("Erreur lors de la suppression de la recette:", error)
    throw error
  }
}
