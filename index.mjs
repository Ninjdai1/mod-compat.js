import { loadData } from "./helpers.mjs";
import { generateRecipes } from "./recipes.mjs";
import { generateMiscData } from "./misc.mjs";
import fs from "fs";
import path from "path";

fs.rmSync('./output/', { recursive: true, force: true });
const loaders = fs.readdirSync(path.resolve(`./mods/`));
for(const loader of loaders){
    const modsData = loadData(loader);
    generateRecipes(modsData, loader);
    generateMiscData(loader);
    fs.cp('./custom/', `./output/${loader}`, {recursive: true}, (err) => {
        if(err)
            console.error(err)
    });
}

