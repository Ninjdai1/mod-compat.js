import { hydration, ingredient_tags_replacement, custom_tags, create_tags } from "./data/custom_tags.mjs";
import fs from "fs";
import path from "path";
import { getLoaderId } from "./helpers.mjs";
import { containers } from "./data/custom_data.mjs";

const letsdo_mods = ["bakery", "beachparty", "bloomingnature", "brewery", "candlelight", "herbalbrews", "farm_and_charm", "meadow", "vinery"];

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
    for(const file of iterate(create_tags, loader, `./output/${loader}/create/tags`)){
        if (!fs.existsSync(file.dir)){
            fs.mkdirSync(path.resolve(file.dir), { recursive: true });
        }
        fs.writeFile(`${file.dir}/${file.name}`, JSON.stringify({replace: false, values: file.values}, undefined, 4), (err) => {
            if (err)
                console.log(err);
        });
    }
    
    const containers_tag = {
        replace: false,
        values: []
    }
    containers.items.forEach(item => {
        containers_tag.values.push({
            id: item,
            required: false,
        })
    })
    containers.tags.forEach(tag => {
        containers_tag.values.push({
            id: `#${tag}`,
            required: false,
        })
    })
    for(const mod of letsdo_mods){
        const mod_tags_dir = `./output/${loader}/${mod}/tags/items`;
        if (!fs.existsSync(mod_tags_dir)){
            fs.mkdirSync(path.resolve(mod_tags_dir), { recursive: true });
        }
        fs.writeFile(`${mod_tags_dir}/container.json`, JSON.stringify(containers_tag, undefined, 4), (err) => {
            if (err)
                console.log(err);
        });
    }
}

function ingredientToTag(ingredient, loader){
    const loader_id = getLoaderId(loader);
    const noLauncherName = (ingredient.item ? ingredient.item : ingredient.tag ? ingredient.tag.replace(`c:`, "$loader$:").replace("forge:", "loader$") : "")
    const name_replacements = ingredient_tags_replacement(loader_id);

    if(ingredient.item && name_replacements.items[noLauncherName]) {
        return {
            tag: name_replacements.items[noLauncherName]
        };
    } else if(ingredient.tag && name_replacements.tags[noLauncherName]) {
        return {
            tag: name_replacements.tags[noLauncherName]
        };
    } else {
        return ingredient;
    }
}

function iterate(obj, loader, path=`./output/${loader}/${getLoaderId(loader)}/tags`, output=[]) {
    for (var property in obj) {
        if (obj.hasOwnProperty(property)) {
            if (typeof obj[property] == "object" && !Array.isArray(obj[property])) {
                iterate(obj[property], loader, path + '/' + property, output);
            } else {
                output.push({
                    dir: `${path}/`,
                    name: property.replaceAll("$loader$", getLoaderId(loader)).replaceAll(".json", "")+".json",
                    values: obj[property].map(e => { 
                        return {
                            id: e.replaceAll("$loader$", getLoaderId(loader)),
                            required: false,
                        }
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
            if(!hydration_values[value]) hydration_values[value] = {replace: false, items: []};
            for(const item of modData[value]){
                hydration_values[value].items.push(item);
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

export { generateTagData, ingredientToTag }
