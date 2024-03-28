import fs from "fs";

function generateRecipes(modsData){
    for(const mod of Object.keys(modsData)){
        console.log(mod)
        const modData = modsData[mod];
        for(const recipeName of Object.keys(modData.recipes)){
            const recipes = modData.recipes[recipeName];
            
            for (let index = 0; index < recipes.length; index++) {
                const recipe = recipes[index];

                console.log(recipe)
                const itemId = getIdFromRecipe(recipe)
                const [itemMod, item] = itemId.split(":");
                switch (recipe.type) {
                    case "farmersdelight:cooking":
                        writeRecipe({
                            recipe: withDependencies({
                                recipe: convertFDCookingToMeadowCookingPot(recipe, mod),
                                mods: [mod, itemMod, "meadow"],
                            }),
                            modName: mod,
                            targetMod: "meadow",
                            targetType: "cauldron",
                            item: item
                        })
                        writeRecipe({
                            recipe: withDependencies({
                                recipe: convertFDCookingToBakeryCookingPot(recipe, mod),
                                mods: [mod, itemMod, "bakery"],
                            }),
                            modName: mod,
                            targetMod: "bakery",
                            targetType: "pot_cooking",
                            item: item
                        })
                        break;
                    case "meadow:cooking":
                        writeRecipe({
                            recipe: withDependencies({
                                recipe: convertMeadowCookingPotToFDCooking(recipe, mod),
                                mods: [mod, itemMod, "farmersdelight"],
                            }),
                            modName: mod,
                            targetMod: "farmersdelight",
                            targetType: "cooking",
                            item: item
                        })
                        writeRecipe({
                            recipe: withDependencies({
                                recipe: convertMeadowCookingPotToBakeryCookingPot(recipe, mod),
                                mods: [mod, itemMod, "bakery"],
                            }),
                            modName: mod,
                            targetMod: "bakery",
                            targetType: "pot_cooking",
                            item: item
                        })
                        break;
                    case "meadow:cheese":
                        writeRecipe({
                            recipe: withDependencies({
                                recipe: convertMeadowCheeseToCreatePress(recipe, mod),
                                mods: [mod, itemMod, "create"],
                            }),
                            modName: mod,
                            targetMod: "create",
                            targetType: "compacting",
                            item: item
                        })
                        break;
                    case "vinery:apple_mashing":
                        writeRecipe({
                            recipe: withDependencies({
                                recipe: convertVineryMashToCreatePress(recipe, mod),
                                mods: [mod, itemMod, "create"],
                            }),
                            modName: mod,
                            targetMod: "create",
                            targetType: "compacting",
                            item: item
                        })
                        break;
                    case "vinery:wine_fermentation":
                        writeRecipe({
                            recipe: withDependencies({
                                recipe: convertVineryFermentationToCreateMixing(recipe, mod),
                                mods: [mod, itemMod, "create"],
                            }),
                            modName: mod,
                            targetMod: "create",
                            targetType: "mixing",
                            item: item
                        })
                        break;
                    case "bakery:pot_cooking":
                        writeRecipe({
                            recipe: withDependencies({
                                recipe: convertBakeryCookingPotToFDCooking(recipe, mod),
                                mods: [mod, itemMod, "farmersdelight"],
                            }),
                            modName: mod,
                            targetMod: "farmersdelight",
                            targetType: "cooking",
                            item: item
                        })
                        writeRecipe({
                            recipe: withDependencies({
                                recipe: convertBakeryCookingPotToMeadowCookingPot(recipe, mod),
                                mods: [mod, itemMod, "meadow"],
                            }),
                            modName: mod,
                            targetMod: "meadow",
                            targetType: "cooking",
                            item: item
                        })
                        break;
                    case "bakery:crafting_bowl":
                        writeRecipe({
                            recipe: withDependencies({
                                recipe: convertBakeryBowlToCreateMixer(recipe, mod),
                                mods: [mod, itemMod, "create"],
                            }),
                            modName: mod,
                            targetMod: "create",
                            targetType: "mixing",
                            item: item
                        })
                        break;

                    default:
                        break;
                }
            }
        }
    }
}

function getIdFromRecipe(recipe){
    let itemId;
    if(recipe.result){
        itemId = recipe.result?.item || recipe.result[0]?.item || recipe.result?.base_ingredient?.item || recipe.result;
    } else if(recipe.results){
        itemId = recipe.results[0].item || recipe.results[0].item;
    } else if(recipe.outputItem){
        itemId = recipe.outputItem;
    } else if(recipe.output){
        itemId = recipe.output.item ||recipe.output.name || recipe.output;
    } else if(recipe.item){
        itemId = recipe.item;
    }
    return itemId;
}

function withDependencies({recipe, mods=["minecraft"]}) {
    const uniq = [...new Set(mods)];
    recipe["fabric:load_conditions"] = [
        {
            condition: "fabric:all_mods_loaded",
            values: uniq
        }
    ]
    recipe.conditions = []
    for (const mod of uniq) {
        recipe.conditions.push(
            {
                type: "forge:mod_loaded",
                modid: mod
            }
        )
    }
    return recipe;
}

function writeRecipe({recipe, modName, targetMod, targetType, item}) {
    const dir = `./output/${modName}/recipes/${targetMod}/${targetType}`;
    
    if (!fs.existsSync(dir)){
        fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFile(`./output/${modName}/recipes/${targetMod}/${targetType}/${item}.json`, JSON.stringify(recipe), (err) => {
        if (err)
            console.log(err);
    });
}



function convertFDCookingToMeadowCookingPot(recipe, mod) {
    const meadowRecipe = {
        type: "meadow:cooking",
        result: recipe.result,
        ingredients : [],
    };
    if(recipe.container){
        meadowRecipe.ingredients.push(recipe.container);
    };
    meadowRecipe.ingredients.push(...recipe.ingredients);
    return meadowRecipe;
}

function convertFDCookingToBakeryCookingPot(recipe, mod) {
    const meadowRecipe = {
        type: "bakery:pot_cooking",
        result: recipe.result,
        ingredients : [],
    };
    meadowRecipe.ingredients.push(...recipe.ingredients);
    return meadowRecipe;
}

function convertMeadowCookingPotToFDCooking(recipe, mod) {
    const FDRecipe = {
        type: "farmersdelight:cooking",
        result: recipe.result,
        ingredients : [],
    };
    FDRecipe.ingredients.push(...recipe.ingredients);
    return FDRecipe;
}

function convertMeadowCookingPotToBakeryCookingPot(recipe, mod) {
    const bakeryRecipe = {
        type: "bakery:pot_cooking",
        result: recipe.result,
        ingredients : [],
    };
    bakeryRecipe.ingredients.push(...recipe.ingredients);
    return bakeryRecipe;
}

function convertMeadowCheeseToCreatePress(recipe, mod){
    const createRecipe = {
        type: "create:compacting",
        results: [{item:recipe.result}],
        ingredients : [recipe.ingredient],
    };
    if(recipe.bucket){
        createRecipe.ingredients.push(recipe.bucket);
    };
    return createRecipe;
}

function convertVineryMashToCreatePress(recipe, mod){
    const createRecipe = {
        type: "create:compacting",
        results: [recipe.output],
        ingredients : [recipe.input],
    };
    return createRecipe;
}

function convertVineryFermentationToCreateMixing(recipe, mod){
    const createRecipe = {
        type: "create:mixing",
        results: [recipe.result],
        ingredients : recipe.ingredients,
    };
    return createRecipe;
}

function convertBakeryCookingPotToMeadowCookingPot(recipe, mod) {
    const meadowRecipe = {
        type: "meadow:cooking",
        result: recipe.result,
        ingredients : [],
    };
    if(recipe.container){
        meadowRecipe.ingredients.push(recipe.container);
    };
    meadowRecipe.ingredients.push(...recipe.ingredients);
    return meadowRecipe;
}

function convertBakeryCookingPotToFDCooking(recipe, mod) {
    const FDRecipe = {
        type: "farmersdelight:cooking",
        result: recipe.result,
        ingredients : [],
    };
    if(recipe.container){
        FDRecipe.ingredients.push(recipe.container);
    };
    FDRecipe.ingredients.push(...recipe.ingredients);
    return FDRecipe;
}

function convertBakeryBowlToCreateMixer(recipe, mod) {
    const createRecipe = {
        type: "create:mixing",
        results: [recipe.result],
        ingredients : [],
    };
    createRecipe.ingredients.push(...recipe.ingredients);
    return createRecipe;
}

export { generateRecipes }
