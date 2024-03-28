import { loadData } from "./helpers.mjs";
import { generateRecipes } from "./recipes.mjs";
import fs from "fs";
const modsData = loadData();

generateRecipes(modsData);
fs.cp('./custom/', './output/', {recursive: true}, (err) => {
    if(err)
        console.error(err)
});
