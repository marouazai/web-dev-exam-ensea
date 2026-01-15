// ============================================
// IMPORTS - Modules nécessaires
// ============================================
import { getAllRecipes, createRecipe } from "./api.js"
import { renderRecipeCard, clearRecipesList } from "./ui.js"

// ============================================
// INITIALISATION DE L'APPLICATION
// ============================================
// Cette fonction est appelée automatiquement au chargement de la page
// Elle charge et affiche toutes les recettes

document.addEventListener("DOMContentLoaded", () => {
	// console.log("Application chargée")
	loadRecipes()
	setupEventListeners()
})

// ============================================
// CHARGER ET AFFICHER LES RECETTES
// ============================================
// Cette fonction est fournie comme EXEMPLE de référence
// Étudiez-la pour comprendre le pattern async/await et le flow de données

const loadRecipes = async () => {
	try {
		// 1. Appeler l'API pour récupérer toutes les recettes
		const recipes = await getAllRecipes()

		// console.log("Recettes chargées:", recipes)

		// 2. Afficher les recettes dans la grid
		displayRecipes(recipes)
	} catch (error) {
		console.error("Erreur lors du chargement des recettes:", error)
		alert(
			"Impossible de charger les recettes. Vérifiez que le serveur est démarré."
		)
	}
}

// ============================================
// AFFICHER LES RECETTES DANS LA GRID
// ============================================
// Fonction fournie - génère le HTML pour toutes les recettes

const displayRecipes = (recipes) => {
	// Récupérer le conteneur où afficher les recettes
	const recipesContainer = document.getElementById("recipes-container")

	// Vider le conteneur avant d'ajouter les nouvelles recettes
	clearRecipesList(recipesContainer)

	// Si aucune recette, afficher un message
	if (recipes.length === 0) {
		recipesContainer.innerHTML = `
			<div class="col-12">
				<div class="alert alert-info text-center" role="alert">
					Aucune recette disponible. Ajoutez-en une !
				</div>
			</div>
		`
		return
	}

	// Générer et afficher chaque recette
	recipes.forEach((recipe) => {
		const cardHTML = renderRecipeCard(recipe)
		recipesContainer.innerHTML += cardHTML
		console.log("Recette:", recipe)
	})
}

// ============================================
// CONFIGURATION DES EVENT LISTENERS
// ============================================

const setupEventListeners = () => {
	// Event listener pour le formulaire d'ajout de recette
	const addRecipeForm = document.getElementById("addRecipeForm")

	if (addRecipeForm) {
		addRecipeForm.addEventListener("submit", handleAddRecipe)
	}
}

// ============================================
// AJOUTER UNE NOUVELLE RECETTE
// ============================================
// Cette fonction est appelée quand l'utilisateur soumet le formulaire dans le modal

export const handleAddRecipe = async (event) => {
	// TODO 1: Empêcher le rechargement de la page
	event.preventDefault()

	try {
		// TODO 2: Récupérer les valeurs des champs du formulaire
		// Les IDs des champs sont: recipeName, recipeIngredients, recipeInstructions, recipePrepTime
		const name = document.getElementById("recipeName")?.value.trim() || ""
		const ingredients =
			document.getElementById("recipeIngredients")?.value.trim() || ""
		const instructions =
			document.getElementById("recipeInstructions")?.value.trim() || ""

		// Convertir en nombre (et sécuriser)
		const prepTimeRaw = document.getElementById("recipePrepTime")?.value || ""
		const prepTime = parseInt(prepTimeRaw, 10)

		const imageUrl =
			document.getElementById("recipeImageUrl")?.value.trim() || ""

		// Petite validation (évite d'envoyer une recette vide)
		if (!name || !ingredients || !instructions || Number.isNaN(prepTime)) {
			alert(
				"Veuillez remplir tous les champs obligatoires (nom, ingrédients, instructions, temps de préparation)."
			)
			return
		}

		// TODO 3: Créer un objet recette avec les données récupérées
		// (selon ton backend, ingredients/instructions peuvent être string ou array.
		// Ici on garde string comme dans ton formulaire textarea)
		const newRecipe = {
			name,
			ingredients,
			instructions,
			prepTime,
			imageUrl, // ajouté
		}

		// TODO 4: Appeler l'API pour créer la recette
		await createRecipe(newRecipe)

		// TODO 5: Fermer le modal après la création
		const modalEl = document.getElementById("addRecipeModal")
		if (modalEl && window.bootstrap) {
			const modal = window.bootstrap.Modal.getInstance(modalEl)
			if (modal) modal.hide()
		}

		// TODO 6: Afficher un message de succès
		alert("Recette ajoutée avec succès !")

		// TODO 7: Recharger la liste des recettes pour afficher la nouvelle
		await loadRecipes()

		// TODO 8: Réinitialiser le formulaire
		event.target.reset()
	} catch (error) {
		console.error("Erreur lors de l'ajout de la recette:", error)
		alert("Erreur lors de l'ajout de la recette. Veuillez réessayer.")
	}
}
