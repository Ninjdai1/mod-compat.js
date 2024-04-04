import fs from "fs";
import { vinery_bushes, cuttables } from "./custom_data.mjs";

function generateRecipes(modsData, loader){
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
                        writeRecipe({loader:loader,
                            recipe: withDependencies({
                                recipe: convertFDCookingToMeadowCookingPot(recipe, mod),
                                mods: [mod, itemMod, "meadow"],
                            }),
                            modName: mod,
                            targetMod: "meadow",
                            targetType: "cauldron",
                            item: item
                        })
                        writeRecipe({loader:loader,
                            recipe: withDependencies({
                                recipe: convertFDCookingToBakeryCookingPot(recipe, mod),
                                mods: [mod, itemMod, "bakery"],
                            }),
                            modName: mod,
                            targetMod: "bakery",
                            targetType: "pot_cooking",
                            item: item
                        })
                        writeRecipe({loader:loader,
                            recipe: withDependencies({
                                recipe: convertFDCookingToCandlelightCookingPot(recipe, mod),
                                mods: [mod, itemMod, "candlelight"],
                            }),
                            modName: mod,
                            targetMod: "candlelight",
                            targetType: "pot_cooking",
                            item: item
                        })
                        break;
                    case "meadow:cooking":
                        writeRecipe({loader:loader,
                            recipe: withDependencies({
                                recipe: convertMeadowCookingPotToFDCooking(recipe, mod),
                                mods: [mod, itemMod, "farmersdelight"],
                            }),
                            modName: mod,
                            targetMod: "farmersdelight",
                            targetType: "cooking",
                            item: item
                        })
                        writeRecipe({loader:loader,
                            recipe: withDependencies({
                                recipe: convertMeadowCookingPotToBakeryCookingPot(recipe, mod),
                                mods: [mod, itemMod, "bakery"],
                            }),
                            modName: mod,
                            targetMod: "bakery",
                            targetType: "pot_cooking",
                            item: item
                        })
                        writeRecipe({loader:loader,
                            recipe: withDependencies({
                                recipe: convertMeadowCookingPotToCandlelightCookingPot(recipe, mod),
                                mods: [mod, itemMod, "candlelight"],
                            }),
                            modName: mod,
                            targetMod: "candlelight",
                            targetType: "pot_cooking",
                            item: item
                        })
                        break;
                    case "candlelight:pot_cooking":
                        writeRecipe({loader:loader,
                            recipe: withDependencies({
                                recipe: convertCandlelightCookingPotToFDCookingPot(recipe, mod),
                                mods: [mod, itemMod, "farmersdelight"],                                                                                                        
                            }),
                            modName: mod,
                            targetMod: "farmersdelight",
                            targetType: "cooking",
                            item: item
                        })
                        writeRecipe({loader:loader,
                            recipe: withDependencies({
                                recipe: convertCandlelightCookingPotToBakeryCookingPot(recipe, mod),
                                mods: [mod, itemMod, "bakery"],
                            }),
                            modName: mod,
                            targetMod: "bakery",
                            targetType: "pot_cooking",
                            item: item
                        })
                        writeRecipe({loader:loader,
                            recipe: withDependencies({
                                recipe: convertCandlelightCookingPotToMeadowCookingPot(recipe, mod),
                                mods: [mod, itemMod, "meadow"],
                            }),
                            modName: mod,
                            targetMod: "meadow",
                            targetType: "cauldron",
                            item: item
                        })
                        break;
                    case "meadow:cheese":
                        writeRecipe({loader:loader,
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
                        writeRecipe({loader:loader,
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
                        writeRecipe({loader:loader,
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
                        writeRecipe({loader:loader,
                            recipe: withDependencies({
                                recipe: convertBakeryCookingPotToFDCooking(recipe, mod),
                                mods: [mod, itemMod, "farmersdelight"],
                            }),
                            modName: mod,
                            targetMod: "farmersdelight",
                            targetType: "cooking",
                            item: item
                        })
                        writeRecipe({loader:loader,
                            recipe: withDependencies({
                                recipe: convertBakeryCookingPotToMeadowCookingPot(recipe, mod),
                                mods: [mod, itemMod, "meadow"],
                            }),
                            modName: mod,
                            targetMod: "meadow",
                            targetType: "cooking",
                            item: item
                        })
                        writeRecipe({loader:loader,
                            recipe: withDependencies({
                                recipe: convertBakeryCookingPotToCandlelightCookingPot(recipe, mod),
                                mods: [mod, itemMod, "candlelight"],
                            }),
                            modName: mod,
                            targetMod: "candlelight",
                            targetType: "pot_cooking",
                            item: item
                        })
                        break;
                    case "bakery:crafting_bowl":
                        writeRecipe({loader:loader,
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
                    case "youkaishomecoming:kettle":
                        writeRecipe({loader:loader,
                            recipe: withDependencies({
                                recipe: convertYoukaishomecomingKettleToHerbalbrewsKettle(recipe, mod),
                                mods: [mod, itemMod, "herbalbrews"],
                            }),
                            modName: mod,
                            targetMod: "herbalbrews",
                            targetType: "kettle_brewing",
                            item: item
                        })
                        break;
                    case "herbalbrews:kettle_brewing":
                        writeRecipe({loader:loader,
                            recipe: withDependencies({
                                recipe: convertHerbalbrewsKettleToYoukaishomecomingKettle(recipe, mod),
                                mods: [mod, itemMod, "youkaishomecoming"],
                            }),
                            modName: mod,
                            targetMod: "youkaishomecoming",
                            targetType: "kettle",
                            item: item
                        })
                        break;

                    default:
                        break;
                }
            }
        }
    }
    for(const bush of vinery_bushes){
        const originMod = bush.seed.split(":")[0];
        writeRecipe({loader:loader,
            recipe: withDependencies({
                recipe: vineryBushesToBotanyPots(bush),
                mods: [originMod, "botanypots"],
            }),
            modName: originMod,
            targetMod: "botanypots",
            targetType: "crop",
            item: bush.item.split(":")[1],
        })
    }
    for(const mod of Object.keys(cuttables)){
        for(const recipe of cuttables[mod]){
            writeRecipe({loader:loader,
                recipe: withDependencies({
                    recipe: toFarmersDelightCuttable(recipe),
                    mods: [mod, "farmersdelight"],
                }),
                modName: mod,
                targetMod: "farmersdelight",
                targetType: "cutting",
                item: recipe.output[0].item.split(":")[1],
            })
        }
    }
}

function getIdFromRecipe(recipe){
    let itemId;
    if(recipe.result){
        itemId = recipe.result?.item || recipe.result[0]?.item || recipe.result?.base_ingredient?.item || recipe.result;
    } else if(recipe.results){
        itemId = recipe.results[0].item || recipe.results[0].fluid;
    } else if(recipe.outputItem){
        itemId = recipe.outputItem;
    } else if(recipe.output){
        itemId = recipe.output.item ||recipe.output.name || recipe.output;
    } else if(recipe.item){
        itemId = recipe.item;
    }
    return itemId;
}

function withDependencies({loader, recipe, mods=["minecraft"]}) {
    const uniq = [...new Set(mods)];
    if(loader=="fabric"){
        recipe["fabric:load_conditions"] = [
            {
                condition: "fabric:all_mods_loaded",
                values: uniq
            }
        ]
    } else if(loader=="forge" || loader=="neoforge"){
        recipe.conditions = []
        for (const mod of uniq) {
            recipe.conditions.push(
                {
                    type: `${loader}:mod_loaded`,
                    modid: mod
                }
            )
        }
    }
    return recipe;
}

function writeRecipe({recipe, loader, modName, targetMod, targetType, item}) {
    const dir = `./output/${loader}/${modName}/recipes/${targetMod}/${targetType}`;
    
    if (!fs.existsSync(dir)){
        fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFile(`./output/${loader}/${modName}/recipes/${targetMod}/${targetType}/${item}.json`, JSON.stringify(recipe, undefined, 4), (err) => {
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

function convertFDCookingToCandlelightCookingPot(recipe, mod) {
    const candlelightRecipe = {
        type: "candlelight:pot_cooking",
        result: recipe.result,
        ingredients : [],
    };
    candlelightRecipe.ingredients.push(...recipe.ingredients);
    if(recipe.container) candlelightRecipe.container = recipe.container;
    return candlelightRecipe;
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

function convertMeadowCookingPotToCandlelightCookingPot(recipe, mod) {
    const candlelightRecipe = {
        type: "candlelight:pot_cooking",
        result: recipe.result,
        ingredients : [],
    };
    candlelightRecipe.ingredients.push(...recipe.ingredients);
    if(recipe.container) candlelightRecipe.container = recipe.container;
    return candlelightRecipe;
}

function convertCandlelightCookingPotToBakeryCookingPot(recipe, mod) {
    const bakeryRecipe = {
        type: "bakery:pot_cooking",
        result: recipe.result,
        ingredients : [],
    };
    bakeryRecipe.ingredients.push(...recipe.ingredients);
    if(recipe.container) bakeryRecipe.container = recipe.container;
    return bakeryRecipe;
}

function convertCandlelightCookingPotToFDCookingPot(recipe, mod) {
    const FDRecipe = {
        type: "farmersdelight:cooking",
        result: recipe.result,
        ingredients : [],
    };
    FDRecipe.ingredients.push(...recipe.ingredients);
    if(recipe.container) FDRecipe.container = recipe.container;
    return FDRecipe;
}

function convertCandlelightCookingPotToMeadowCookingPot(recipe, mod) {
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

function convertBakeryCookingPotToCandlelightCookingPot(recipe, mod) {
    const candlelightRecipe = {
        type: "candlelight:pot_cooking",
        result: recipe.result,
        ingredients : [],
    };
    candlelightRecipe.ingredients.push(...recipe.ingredients);
    if(recipe.container) candlelightRecipe.ingredients.push(recipe.container);
    return candlelightRecipe;
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

/*function convertBakeryStationToCreateDeployer(recipe, mod) {
    const createRecipe = {
        type: "create:deploying",
        results: [recipe.result],
        ingredients : [],
    };
    createRecipe.ingredients.push(...recipe.ingredients);
    return createRecipe;
}*/

function vineryBushesToBotanyPots({seed, bush, item, categories}){
    return {
        type: "botanypots:crop",
        seed: {
            item: seed
        },
        categories: categories,
        growthTicks: 2400,
        display:{
            type:"botanypots:transitional",
            phases: [
              { block:bush, properties: {age:0} },
              { block:bush, properties: {age:1} },
              { block:bush, properties: {age:2} },
              { block:bush, properties: {age:3} },
            ]
        },
        drops: [
            { chance: 1, output: {item: item} },
            { chance: 0.5, output: {item: item} },
            { chance: 0.25, output: {item: item} },
        ]
    }
}

function convertHerbalbrewsKettleToYoukaishomecomingKettle(recipe, mod) {
    const youkaisRecipe = {
        type: "youkaishomecoming:kettle",
        container: recipe.container,
        cookingtime: 200,
        experience: recipe.experience,
        recipe_book_tab: "drinks",
        result: recipe.result,
        ingredients: [],
    }
    for (const ingredient of recipe.ingredients) {
        if(ingredient.item!="minecraft:water_bucket"){
            youkaisRecipe.ingredients.push(ingredient);
        }
    }
    return youkaisRecipe;
}

function convertYoukaishomecomingKettleToHerbalbrewsKettle(recipe, mod) {
    const herbalbrewsRecipe = {
        type: "herbalbrews:kettle_brewing",
        container: recipe.container,
        experience: recipe.experience,
        result: recipe.result,
        ingredients: recipe.ingredients,
    }
    herbalbrewsRecipe.ingredients.push({item: "minecraft:water_bucket"});
    
    return herbalbrewsRecipe;
}

function toFarmersDelightCuttable(recipe) {
    const FDRecipe = {
        type: "farmersdelight:cutting",
        ingredients: recipe.input,
        result: recipe.output,
        tool: {
            tag: "letsdo_addon_compat:tools/knives"
        }
    }
    return FDRecipe;
}

export { generateRecipes }
