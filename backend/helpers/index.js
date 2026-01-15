import fs from "fs"

// Lire le fichier recipes.json et retourner un tableau
export const readRecipes = (recipesPath) => {
  const data = fs.readFileSync(recipesPath, "utf8")
  return JSON.parse(data)
}

// Écrire le tableau des recettes dans recipes.json
export const writeRecipes = (recipesPath, recipes) => {
  fs.writeFileSync(recipesPath, JSON.stringify(recipes, null, 2), "utf8")
}
