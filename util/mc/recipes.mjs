
function getRecipesFromFiles(files){
    const recipes = {};
    for (const path in files) {
        if (files.hasOwnProperty(path) && path.includes("/recipes/") && !path.includes("/advancements/recipes/") && path.endsWith(".json")) {
            let json = JSON.parse(files[path].toString());
            if(json.type == "forge:conditional" || json.type == "neoforge:conditional"){
                if(!(json.recipes[0])) continue;
                json = json.recipes[0].recipe;
            } else if(json.type == "doapi:conditional"){
                json = json.recipe
            }
            let result = json.result?.item || json.result || json.outputItem || json.item || json.output?.item || json.output || (json.results?.length==1 ? json.results[0] : undefined);

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
