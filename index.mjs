import { loadData } from "./helpers.mjs";
import { generateRecipes } from "./recipes.mjs";
const modsData = loadData();

generateRecipes(modsData);
