import fs from "fs";
import { vinery_bushes, cuttables, botanypots } from "./data/custom_recipes.mjs";
import { containers, liquid_containers } from "./data/custom_data.mjs";
import { ingredientToTag } from "./tags.mjs";
import { getLoaderId } from "./helpers.mjs";

function generateRecipes(modsData, loader){
    console.log(loader);
    for(const mod of Object.keys(modsData)){
        console.log(mod)
        const modData = modsData[mod];
        for(const recipeName of Object.keys(modData.recipes)){
            const recipes = modData.recipes[recipeName];
            
            for (let index = 0; index < recipes.length; index++) {
                const recipe = recipes[index];

                //console.log(recipe)
                const itemId = getIdFromRecipe(recipe)
                const [itemMod, item] = itemId.split(":");
                switch (recipe.type) {
                    case "farmersdelight:cooking":
                    case "meadow:cooking":
                    case "candlelight:pot_cooking":
                    case "bakery:pot_cooking":
                    case "farm_and_charm:pot_cooking":
                        writeFLDCookingPotRecipeToFLDCookingPot({
                            loader: loader,
                            index: index,
                            recipe: recipe,
                            mod: mod,
                            item: item,
                            itemMod: itemMod
                        });
                        break;
                    case "meadow:cheese":
                        writeRecipe({
                            loader:loader,
                            index:index,
                            recipe: withDependencies({
                                loader:loader,
                                index:index,
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
                            loader:loader,
                            index:index,
                            recipe: withDependencies({
                                loader:loader,
                                index:index,
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
                            loader:loader, 
                            index:index,
                            recipe: withDependencies({
                                loader:loader, 
                                index:index,
                                recipe: convertVineryFermentationToCreateMixing(recipe, mod),
                                mods: [mod, itemMod, "create"],
                            }),
                            modName: mod,
                            targetMod: "create",
                            targetType: "mixing",
                            item: item
                        });
                        writeRecipe({
                            loader:loader, 
                            index:`${index}_liquids`,
                            recipe: withDependencies({
                                loader:loader, 
                                index:index,
                                recipe: convertVineryFermentationToCreateMixing_Liquids(recipe, mod, loader),
                                mods: [mod, itemMod, "create"],
                            }),
                            modName: mod,
                            targetMod: "create",
                            targetType: "mixing",
                            item: item
                        });
                        break;
                    case "bakery:crafting_bowl":
                    case "farm_and_charm:crafting_bowl":
                        writeRecipe({
                            loader:loader, 
                            index:index,
                            recipe: withDependencies({
                                loader:loader, 
                                index:index,
                                recipe: convertBakeryBowlToCreateMixer(recipe, mod),
                                mods: [mod, itemMod, "create"],
                            }),
                            modName: mod,
                            targetMod: "create",
                            targetType: "mixing",
                            item: item
                        })
                        writeRecipe({
                            loader:loader, 
                            index:`${index}_liquids`,
                            recipe: withDependencies({
                                loader:loader, 
                                index:index,
                                recipe: convertBakeryBowlToCreateMixer_Liquids(recipe, mod, loader),
                                mods: [mod, itemMod, "create"],
                            }),
                            modName: mod,
                            targetMod: "create",
                            targetType: "mixing",
                            item: item
                        })
                        break;
                    case "youkaishomecoming:kettle":
                        writeRecipe({
                            loader:loader, 
                            index:index,
                            recipe: withDependencies({
                                loader:loader, 
                                index:index,
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
                        writeRecipe({
                            loader:loader,
                            index:index,
                            recipe: withDependencies({
                                loader:loader,
                                index:index,
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
            recipe: withDependencies({loader:loader,
                recipe: vineryBushesToBotanyPots(bush),
                mods: [originMod, "botanypots"],
            }),
            modName: originMod,
            targetMod: "botanypots",
            targetType: "crop",
            item: bush.item.split(":")[1],
        })
    }
    for(const mod of Object.keys(botanypots.trees)){
        for (const pot of botanypots.trees[mod]) {
        const originMod = pot.seed.split(":")[0];
            writeRecipe({loader:loader,
                recipe: withDependencies({loader:loader,
                    recipe: treeToBotanyPots(pot),
                    mods: [originMod, "botanypots"],
                }),
                modName: originMod,
                targetMod: "botanypots",
                targetType: "crop",
                item: pot.item.split(":")[1],
            })
        }
    }
    for(const mod of Object.keys(cuttables)){
        for(const recipe of cuttables[mod]){
            writeRecipe({loader:loader,
                recipe: withDependencies({loader:loader,
                    recipe: toFarmersDelightCuttable(recipe, loader),
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
    if(!recipe) return;
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
    //console.log(loader)
    //console.log(recipe);
    return recipe;
}

function writeRecipe({recipe, index, loader, modName, targetMod, targetType, item}) {
    if(!recipe) return;
    const dir = `./output/${loader}/${modName}/recipes/${targetMod}/${targetType}`;
    
    if (!fs.existsSync(dir)){
        fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFile(`./output/${loader}/${modName}/recipes/${targetMod}/${targetType}/${item}${(!index || index==0) ?"":`_${String(index).replace("0_", "")}`}.json`, JSON.stringify(recipe, undefined, 4), (err) => {
        if (err)
            console.log(err);
    });
}

const isPotCooking = (mod) => !["meadow", "farmersdelight"].includes(mod)

function writeFLDCookingPotRecipeToFLDCookingPot({loader, index, recipe, mod, itemMod, item}){
    for(const LDMOD of ["meadow", "bakery", "candlelight", "farm_and_charm", "farmersdelight"]){
        if(LDMOD != mod)
            writeRecipe({
                loader:loader,
                index:index,
                recipe: withDependencies({loader:loader, index:index,
                    recipe: convertFLDCookingPotToFLDCookingPot(recipe, LDMOD, loader),
                    mods: [mod, itemMod, LDMOD],
                }),
                modName: mod,
                targetMod: LDMOD,
                targetType: `${isPotCooking(LDMOD) ? "pot_" : ""}cooking`,
                item: item
            })
            
    }
}

const NO_CONTAINER_MODS = ["meadow"];

function convertFLDCookingPotToFLDCookingPot(recipe, mod, loader) {
    const LDRecipe = {
        type: `${mod}:${isPotCooking(mod) ? "pot_" : ""}cooking`,
        result: recipe.result,
        ingredients : [],
    };
    if(recipe.container) LDRecipe.container = recipe.container;
    
    for(const ingredient of recipe.ingredients){
        if(!LDRecipe.container && isContainer(ingredient) && !(NO_CONTAINER_MODS.includes(mod))) LDRecipe.container = ingredient;
        else LDRecipe.ingredients.push(ingredientToTag(ingredient, loader));
    }
    if(!LDRecipe.container && !(NO_CONTAINER_MODS.includes(mod))) return;
    return LDRecipe;
}
function isContainer(ingredient){
    return containers.items.includes(ingredient.item) || containers.tags.includes(ingredient.tag)
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

function convertVineryFermentationToCreateMixing_Liquids(recipe, mod, loader){
    const loader_id = getLoaderId(loader);
    const createRecipe = {
        type: "create:mixing",
        results: [recipe.result],
        ingredients: [],
    };
    let changed = false;
    createRecipe.ingredients.push(...recipe.ingredients.map((ingredient) => {
        const liquidcontainer = liquid_containers(loader_id);
        if(ingredient.item && (liquidcontainer.items[ingredient.item])) {
            changed = true;
            return liquidcontainer.items[ingredient.item];
        } else if(ingredient.tag && (liquidcontainer.tags[ingredient.tag])) {
            changed = true;
            return liquidcontainer.tags[ingredient.tag];
        } else {
            return ingredientToTag(ingredient, loader);
        }
    }));
    return changed ? createRecipe : null;
}

function convertBakeryBowlToCreateMixer(recipe, mod) {
    const createRecipe = {
        type: "create:mixing",
        results: [recipe.result],
        ingredients : [],
    };
    createRecipe.ingredients.push(...recipe.ingredients.map((ingredient)=> ingredientToTag(ingredient)));
    return createRecipe;
}

function convertBakeryBowlToCreateMixer_Liquids(recipe, mod, loader) {
    const loader_id = getLoaderId(loader);
    const createRecipe = {
        type: "create:mixing",
        results: [recipe.result],
        ingredients : [],
    };
    let changed = false;
    createRecipe.ingredients.push(...recipe.ingredients.map((ingredient) => {
        const liquidcontainer = liquid_containers(loader_id);
        if(ingredient.item && (liquidcontainer.items[ingredient.item])) {
            changed = true;
            return liquidcontainer.items[ingredient.item];
        } else if(ingredient.tag && (liquidcontainer.tags[ingredient.tag])) {
            changed = true;
            return liquidcontainer.tags[ingredient.tag];
        } else {
            return ingredientToTag(ingredient, loader);
        }
    }));
    return changed ? createRecipe : null;
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

function treeToBotanyPots({seed, block, item, categories}){
    const sapling = seed;
    return {
        type: "botanypots:crop",
        seed: {
            item: sapling
        },
        categories: categories,
        growthTicks: 2400,
        display:{
            block: block
        },
        drops: [
            {
                chance: 1.00,
                output: {
                    item: item
                },
                minRolls: 2,
                maxRolls:4
            },
            {
                chance: 0.25,
                output: {
                    item: "minecraft:stick"
                },
                minRolls:1,
                maxRolls:2
            },
            {
                chance: 0.01,
                output: {
                    item: sapling
                }
            }
        ]
    }
}

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

function toFarmersDelightCuttable(recipe, loader) {
    const FDRecipe = {
        type: "farmersdelight:cutting",
        ingredients: recipe.input,
        result: recipe.output,
        tool: {
            tag: `${getLoaderId(loader)}:tools/knives`
        }
    }
    return FDRecipe;
}

export { generateRecipes }
