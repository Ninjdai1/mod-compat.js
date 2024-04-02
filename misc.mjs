import { hydration } from "./custom_data.mjs";
import fs from "fs";

function generateMiscData(loader){
    switch(loader){
        case "fabric":
            writeToughAsNails(loader);
            writeDehydration(loader);
            break;
        case "forge":
            writeToughAsNails(loader);
            break;
    }
}

function writeToughAsNails(loader) {
    const dir = `./output/${loader}/toughasnails/tags/items/hydration/`;

    const hydration_values = mergedHydrationData();

    if (!fs.existsSync(dir)){
        fs.mkdirSync(dir, { recursive: true });
    }
    for(const value of Object.keys(hydration_values)){
        fs.writeFile(`${dir}/${value}0_hydration_drinks.json`, JSON.stringify({replace: false, values: hydration_values[value]}), (err) => {
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
        fs.writeFile(`${dir}/${mod}_items.json`, JSON.stringify(hydration_values), (err) => {
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

export { generateMiscData };
