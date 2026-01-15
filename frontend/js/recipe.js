// ============================================
// IMPORTS - Modules nécessaires
// ============================================
import { getOneRecipe, deleteOneRecipe } from "./api.js"
import { renderSingleRecipe } from "./ui.js"

// ============================================
// CHARGER ET AFFICHER UNE RECETTE
// ============================================

const loadRecipe = async (recipeId) => {
	try {
		// Appeler l'API pour récupérer la recette par son ID
		const recipe = await getOneRecipe(recipeId)

		// Afficher la recette
		const recipeDetail = document.getElementById("recipe-detail")
		recipeDetail.innerHTML = renderSingleRecipe(recipe)
	} catch (error) {
		console.error("Erreur lors du chargement de la recette:", error)
		alert(
			"Impossible de charger la recette. Vérifiez que le serveur est démarré."
		)
	}
}

// ============================================
// EVENT LISTENERS
// ============================================

const setupEventListeners = () => {
	const loader = document.getElementById("loading-spinner")
	const recipeDetail = document.getElementById("recipe-detail")
	const deleteButton = document.getElementById("delete-recipe-btn")

	// Affichage loader / contenu
	if (loader) loader.classList.add("d-none")
	if (recipeDetail) recipeDetail.classList.remove("d-none")

	// Bouton supprimer
	if (deleteButton) {
		deleteButton.addEventListener("click", async () => {
			try {
				const urlParams = new URLSearchParams(window.location.search)
				const recipeId = urlParams.get("id")

				await deleteOneRecipe(recipeId)

				alert("Recette supprimée avec succès !")
				window.location.href = "index.html"
			} catch (error) {
				console.error("Erreur suppression:", error)
				alert("Erreur lors de la suppression.")
			}
		})
	}
}

// ============================================
// INITIALISATION
// ============================================

document.addEventListener("DOMContentLoaded", () => {
	const urlParams = new URLSearchParams(window.location.search)
	const recipeId = urlParams.get("id")

	loadRecipe(recipeId)
	setupEventListeners()
})
