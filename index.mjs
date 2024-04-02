import { loadData } from "./helpers.mjs";
import { generateRecipes } from "./recipes.mjs";
import fs from "fs";
import path from "path";


const loaders = fs.readdirSync(path.resolve(`./mods/`));
for(const loader of loaders){
    const modsData = loadData(loader);
    generateRecipes(modsData, loader);
    fs.cp('./custom/', `./output/${loader}`, {recursive: true}, (err) => {
        if(err)
            console.error(err)
    });
}

