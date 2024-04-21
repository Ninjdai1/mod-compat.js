import { hydration, ingredient_tags_replacement, custom_tags } from "./data/custom_tags.mjs";
import fs from "fs";
import path from "path";

function generateTagData(loader){
    switch(loader){
        case "fabric":
            writeToughAsNails(loader);
            writeDehydration(loader);
            break;
        case "forge":
        case "neoforge":
            writeToughAsNails(loader);
            break;
    }
    for(const file of iterate(custom_tags, loader)){
        if (!fs.existsSync(file.dir)){
            fs.mkdirSync(path.resolve(file.dir), { recursive: true });
        }
        fs.writeFile(`${file.dir}/${file.name}`, JSON.stringify({replace: false, values: file.values}, undefined, 4), (err) => {
            if (err)
                console.log(err);
        });
    }
}

function ingredientToTag(ingredient){
    if(ingredient.item && ingredient_tags_replacement[ingredient.item]) {
        return {
            tag: ingredient_tags_replacement[ingredient.item]
        }
    }
}

function iterate(obj, loader, path=`./output/${loader}/${loader=="forge" ? "forge" : "c"}/tags`, output=[]) {
    for (var property in obj) {
        if (obj.hasOwnProperty(property)) {
            if (typeof obj[property] == "object" && !Array.isArray(obj[property])) {
                iterate(obj[property], loader, path + '/' + property, output);
            } else {
                output.push({
                    dir: `${path}/`,
                    name: property.replaceAll("$loader$", loader=="forge" ? "forge" : "c").replaceAll(".json", "")+".json",
                    values: obj[property].map(e => { 
                        return e.replaceAll("$loader$", loader=="forge" ? "forge" : "c")
                    })
                })
            }
        }
    }
    return output
}

function writeToughAsNails(loader) {
    const dir = `./output/${loader}/toughasnails/tags/items/hydration/`;

    const hydration_values = mergedHydrationData();

    if (!fs.existsSync(dir)){
        fs.mkdirSync(dir, { recursive: true });
    }
    for(const value of Object.keys(hydration_values)){
        fs.writeFile(`${dir}/${value}0_hydration_drinks.json`, JSON.stringify({replace: false, values: hydration_values[value]}, undefined, 4), (err) => {
            if (err)
                console.log(err);
        });
    }
}

function writeDehydration(loader){
    const dir = `./output/${loader}/dehydration/hydration_items/`;
    
    if (!fs.existsSync(dir)){
        fs.mkdirSync(dir, { recursive: true });
    }

    for(const mod of Object.keys(hydration)){
        const hydration_values = {};
        const modData = hydration[mod];
        for(const value of Object.keys(modData)){
            if(!hydration_values[value]) hydration_values[value] = [];
            for(const item of modData[value]){
                hydration_values[value].push({ id: item, required: false });
            }
        }
        fs.writeFile(`${dir}/${mod}_items.json`, JSON.stringify(hydration_values, undefined, 4), (err) => {
            if (err)
                console.log(err);
        });
    }
}

function mergedHydrationData(){
    const hydration_values = {};
    for(const mod of Object.keys(hydration)){
        const modData = hydration[mod];
        for(const value of Object.keys(modData)){
            if(!hydration_values[value]) hydration_values[value] = [];
            for(const item of modData[value]){
                hydration_values[value].push({ id: item, required: false });
            }
        }
    }
    return hydration_values;
}

export { generateTagData }
