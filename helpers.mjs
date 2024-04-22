import fs from "fs";
import path from "path";
import { getData } from "./util/mc/datapack.mjs";

function loadData(loader){
    const modData = {};
    const mods = fs
        .readdirSync(path.resolve(`./mods/${loader}`))
        .filter((file) => file.endsWith(".jar") || file.endsWith(".zip"));
    for (const mod of mods) {
        modData[mod.split(".")[0]] = getData(`./mods/${loader}/${mod}`)
    }
    return modData;
}

function mergeModsData(modData){
    const data = {
        recipes: {},
        langs: {}
    };
    for (const mod of modData) {
        Object.keys(mod.recipes).forEach(modKey => {
            if(data.recipes[modKey]){
                data.recipes[modKey].push(...mod.recipes[modKey]);
            } else {
                data.recipes[modKey] = mod.recipes[modKey];
            }
        });

        Object.keys(mod.langs).forEach(lang => {
            if(data.langs[lang]){
                data.langs[lang] = {...data.langs[lang], ...mod.langs[lang]};
            } else {
                data.langs[lang] = mod.langs[lang];
            }
        });
    }
    return data;
}

const getLoaderId = (loader) => loader == "forge" ? "forge" : "c";

export { loadData, mergeModsData, getLoaderId }
