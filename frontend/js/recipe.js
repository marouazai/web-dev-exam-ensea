// ============================================
// IMPORTS - Modules nécessaires
// ============================================
import { getOneRecipe, createRecipe } from "./api.js"
import { renderRecipeCard, clearRecipesList } from "./ui.js"

const loadRecipe = async (recipeId) => {
    try {
        // 1. Appeler l'API pour récupérer la recette par son ID
        const recipe = await getOneRecipe(recipeId)

        // 2. Afficher la recette dans la grid
        renderRecipeCard(recipe)
    } catch (error) {
        console.error("Erreur lors du chargement de la recette:", error)
        alert("Impossible de charger la recette. Vérifiez que le serveur est demarré.")
    }
}