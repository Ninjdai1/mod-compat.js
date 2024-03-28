
function getRecipesFromFiles(files){
    const recipes = {};
    for (const path in files) {
        if (files.hasOwnProperty(path) && path.includes("/recipes/") && path.endsWith(".json")) {
            let json = JSON.parse(files[path].toString());
            if(json.type == "forge:conditional"){
                json = json.recipes[0].recipe;
            }
            let result = json.result?.item || json.result || json.outputItem || json.item || json.output?.item || json.output;

            if(!result){
                continue;
            }
            if(recipes[result]?.length > 0){
                recipes[result].push(json);
            } else {
                recipes[result] = [json];
            }
        }
    }
    return recipes;
}

export {
    getRecipesFromFiles
}
