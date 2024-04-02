import path from 'path'
import { readZipArchive } from '../zip/read.mjs';
import { getRecipesFromFiles } from './recipes.mjs';
import { getLangsFromFiles } from './lang.mjs';
import { getTagsFromFiles } from './tags.mjs';

function getData(filepath){
    const data = {};

    const modFiles = readZipArchive(path.resolve(filepath));
    const dataFiles = {};
    for (let index = 0; index < modFiles.length; index++) {
        const element = modFiles[index];
        if(element.entryName.startsWith("data/")){
            dataFiles[element.entryName] = element.getData()
        }
        if(element.entryName.startsWith("assets/")){
            dataFiles[element.entryName] = element.getData()
        }
    }

    data.recipes = getRecipesFromFiles(dataFiles);
    data.tags = getTagsFromFiles(dataFiles);
    data.langs = {}//getLangsFromFiles(dataFiles);

    return data
}

export {
    getData
}
