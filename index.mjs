import { loadData } from "./helpers.mjs";
import { generateRecipes } from "./recipes.mjs";
import { generateTagData } from "./tags.mjs";
import fs from "fs";
import path from "path";

fs.rmSync('./output/', { recursive: true, force: true });
const loaders = fs.readdirSync(path.resolve(`./mods/`));
for(const loader of loaders){
    const modsData = loadData(loader);
    generateRecipes(modsData, loader);
    generateTagData(loader);
    /*fs.cp('./custom/', `./output/${loader}`, {recursive: true}, (err) => {
        if(err)
            console.error(err)
    });*/
}

