import { itemList } from "./custom_data.mjs";

const ingredient_tags_replacement = (loaderid) => {
    return {
        tags: {
            "candlelight:cheese": `${loaderid}:food/cheese`,

            "candlelight:pasta": `${loaderid}:food/pastas`,

            "candlelight:crops/tomato": `${loaderid}:crops/tomato`,
            "$loader$:cabbage": `${loaderid}:crops/cabbage`,
            
            "$loader$:rice": `${loaderid}:grain/rice`,
        },
        items: {
            "farmersdelight:raw_pasta": `${loaderid}:food/raw_pasta`,

            "minecraft:chicken": `${loaderid}:foods/raw_chicken`,
            "minecraft:porkchop": `${loaderid}:foods/raw_pork`,
            "minecraft:mutton": `${loaderid}:foods/raw_mutton`,
            "minecraft:beef": `${loaderid}:foods/raw_beef`,
            "minecraft:rabbit": `${loaderid}:foods/raw_rabbit`,

            "farmersdelight:cod_slice": `${loaderid}:foods/raw_cod`,
            "minecraft:cod": `${loaderid}:foods/raw_fishes/cod`,
            "minecraft:salmon": `${loaderid}:foods/raw_fishes/salmon`,

            "minecraft:beetroot": `${loaderid}:crops/beetroot`,
            "minecraft:carrot": `${loaderid}:crops/carrot`,
            "minecraft:potato": `${loaderid}:crops/potato`,
            "croptopia:garlic": `${loaderid}:crops/garlic`,
            "farmersdelight:tomato": `${loaderid}:crops/tomato`,
            "culturaldelights:regular_eggplants": `${loaderid}:crops/eggplant`,
            "croptopia:eggplant": `${loaderid}:crops/eggplant`,
            "croptopia:lettuce": `${loaderid}:crops/lettuce`,
            "candlelight:lettuce": `${loaderid}:crops/lettuce`,

            "farmersdelight:rice": `${loaderid}:grain/rice`,

            "bakery:strawberry": `${loaderid}:fruits/strawberries`,
            "croptopia:strawberry": `${loaderid}:fruits/strawberries`,
            "croptopia:blueberry": `${loaderid}:fruits/blueberries`,
            "croptopia:blackberry": `${loaderid}:fruits/blackberries`,
            "croptopia:raspberry": `${loaderid}:fruits/raspberries`,

            "pineapple_delight:pineapple_side": `${loaderid}:fruits/pineapple`,

            "expandeddelight:cheese_slice": `${loaderid}:food/cheese`,
            "croptopia:cheese": `${loaderid}:food/cheese`,
            "casualness_delight:cheese_wheel_slice": `${loaderid}:food/cheese`,

            "minecraft:sugar": `${loaderid}:sugar`,
            "minecraft:water_bucket": `${loaderid}:water_buckets`,

            "minecraft:egg": `${loaderid}:eggs`,
            "meadow:alpine_salt": `${loaderid}:salt`,
            "croptopia:salt": `${loaderid}:salt`,

            "minecraft:bone": `${loaderid}:bones`,
            "aquaculture:fish_bones": `${loaderid}:bones/fish`
        }
    }
};

const custom_tags = {
    items: {
        "bones.json": [
            "minecraft:bones",
            "#$loader$:bones/fish"
        ],
        bones: {
            fish: [
                "aquaculture:fish_bones",
            ],
        },
        "cheeses.json": [
            "#$loader$:food/cheese",
        ],
        tools: {
            knives: []
        },
        cheeses: {
            nether: [
                "meadow:piece_of_warped_cheese"
            ],
            normal: [
                "meadow:piece_of_cheese",
                "meadow:piece_of_sheep_cheese",
                "meadow:piece_of_grain_cheese",
                "meadow:piece_of_amethyst_cheese",
                "meadow:piece_of_buffalo_cheese",
                "meadow:piece_of_goat_cheese",
                "expandeddelight:cheese_slice",
                "croptopia:cheese",
                "casualness_delight:cheese_wheel_slice",
            ]
        },
        foods: {
            pastas: [
                "#candlelight:pasta",
                "farmersdelight:raw_pasta",
                "#$loader$:pasta"
            ],
            cheese: [
                "casualness_delight:cheese_wheel_slice",
                "#candlelight:cheese",
                "#meadow:cheese",
                "croptopia:cheese",
                "#$loader$:cheese",
                "#$loader$:cheeses",
                "#$loader$:cheeses/nether",
                "#$loader$:cheeses/normal"
            ],
            cooked_meats: {
                cooked_eggs: [
                    "#$loader$:cooked_eggs"
                ]
            },
            "raw_fishes.json": [
                "#$loader$:foods/raw_fishes/cod",
                "#$loader$:foods/raw_fishes/salmon",
            ],
            raw_fishes: {
                cod: [
                    "minecraft:cod",
                ],
                salmon: [
                    "minecraft:salmon",
                ],
            },
            raw_cod: ["minecraft:cod"],
            raw_salmon: ["minecraft:salmon"],
        },
        crops: {
            garlic: ["croptopia:garlic"],
        },
        vegetables: {
            cabbage: ["croptopia:cabbage"],
            eggplant: ["culturaldelights:regular_eggplants", "croptopia:eggplant"],
            lettuce: ["candlelight:lettuce", "croptopia:lettuce"],
            tomato: ["#candlelight:crops/tomato", "farmersdelight:tomato"],
        },
        grain: {
            rice: ["farmersdelight:rice", "croptopia:rice"],
        },
        fruits: {
            strawberries: ["bakery:strawberry", "croptopia:strawberry"],
            blueberries: ["croptopia:blueberry"],
            blackberries: ["croptopia:blackberry"],
            raspberries: ["croptopia:raspberry"],
            pineapple: ["pineapple_delight:pineapple_side", "croptopia:pineapple"],
            sweet: ["#$loader$:fruits/strawberries", "#$loader$:fruits/blueberries", "#$loader$:fruits/blackberries", "#$loader$:fruits/raspberries", "#$loader$:fruits/pineapple"],
        },
        grains: ["#$loader$:grain/rice"],
        eggs: ["minecraft:egg", "duckling:duck_egg"],
        sugar: [
            "minecraft:sugar"
        ],
        water_buckets: [
            "minecraft:water_bucket"
        ],
        salt: [
            "meadow:alpine_salt",
            "croptopia:salt",
            "vegandelight:salt",
        ],
        milks: ["#meadow:milk"],
    }
}

const RAW_MEATS = ["raw_fishes", "raw_chicken", "raw_pork", "raw_beef", "raw_mutton", "raw_rabbit"]
const VANILLA_CROPS = ["beetroot", "carrot", "potato"]

const MODDED_CROPS = {
    crops: ["garlic"],
    vegetables: ["tomato", "cabbage", "eggplant", "lettuce"],
    grain: ["rice"],
    fruits: ["strawberries", "blueberries", "blackberries", "raspberries", "pineapple"]
}

for(const meat of RAW_MEATS){
    const loader_string = `#$loader$:${meat}`
    custom_tags.items.foods[meat] ? (Array.isArray(custom_tags.items.foods[meat]) ? custom_tags.items.foods[meat].push(loader_string) : custom_tags.items.foods[`${meat}.json`].push(loader_string)) : custom_tags.items.foods[meat] = [loader_string]
}
for(const crop of VANILLA_CROPS){
    const loader_string = `#$loader$:${crop}`;

    const crops = [`minecraft:${crop}`, loader_string, `#$loader$:vegetables/${crop}`];
    custom_tags.items.crops[crop] ? custom_tags.items.crops[crop].push(...crops) : custom_tags.items.crops[crop] = crops

    const vegetables = [`minecraft:${crop}`, loader_string, `#$loader$:crops/${crop}`];
    custom_tags.items.vegetables[crop] ? custom_tags.items.vegetables[crop].push(...vegetables) : custom_tags.items.vegetables[crop] = vegetables;
}
for(const category in MODDED_CROPS){
    if(!custom_tags.items[category]) custom_tags.items[category] = {};
    for(const crop of MODDED_CROPS[category]){
        if(custom_tags.items[category][crop]){
            custom_tags.items[category][crop] = [...new Set([...custom_tags.items[category][crop], `#$loader$:crops/${crop}`, `#$loader$:${crop}`])];
        } else {
            custom_tags.items[category][crop] = [...new Set([`#$loader$:crops/${crop}`, `#$loader$:${crop}`])];
        }
        if(custom_tags.items[crop]){
            custom_tags.items[crop] = [...new Set([...custom_tags.items[crop], `#$loader$:crops/${crop}`, `#$loader$:${category}/${crop}`])];
        } else {
            custom_tags.items[crop] = [...new Set([`#$loader$:crops/${crop}`, `#$loader$:${category}/${crop}`])];
        }
        if(category=="crops") continue;
        if(custom_tags.items.crops[crop]){
            custom_tags.items.crops[crop] = [...new Set([...custom_tags.items.crops[crop], `#$loader$:${crop}`, `#$loader$:${category}/${crop}`])];
        } else {
            custom_tags.items.crops[crop] = [...new Set([`#$loader$:${crop}`, `#$loader$:${category}/${crop}`])];
        }
    }
}

const hydration = {
    beachparty: {
        1: [
            "beachparty:coconut_open",
            "beachparty:sweetberry_milkshake",
            "beachparty:coconut_milkshake",
            "beachparty:chocolate_milkshake"
        ],
        2: [
            "beachparty:coconut_cocktail",
            "beachparty:sweetberries_cocktail",
            "beachparty:cocoa_cocktail",
            "beachparty:pumpkin_cocktail",
            "beachparty:melon_cocktail",
            "beachparty:honey_cocktail"
        ],
        3: [
            "beachparty:sweetberry_icecream",
            "beachparty:coconut_icecream",
            "beachparty:chocolate_icecream"
        ],
        5: [
            "beachparty:refreshing_drink"
        ]
    },
    brewery: {
        1: [
            "brewery:whiskey_jojannik",
            "brewery:whiskey_lilitusinglemalt",
            "brewery:whiskey_cristelwalker",
            "brewery:whiskey_carrasconlabel",
            "brewery:whiskey_magoallan"
        ],
        4: [
            "brewery:beer_wheat",
            "brewery:beer_barley",
            "brewery:beer_hops",
            "brewery:beer_haley"
        ]
    },
    candlelight: {
        1: [
            "candlelight:mozzarella"
        ],
        4: [
            "candlelight:mushroom_soup"
        ],
        5: [
            "candlelight:tomato_soup"
        ]
    },
    herbalbrews: {
        2: [
            "herbalbrews:armor_flask",
            "herbalbrews:armor_flask_big",
            "herbalbrews:damage_flask",
            "herbalbrews:damage_flask_big",
            "herbalbrews:feral_flask",
            "herbalbrews:feral_flask_big"
        ],
        3: [
            "herbalbrews:coffee",
            "herbalbrews:milk_coffee"
        ],
        4: [
            "herbalbrews:green_tea",
            "herbalbrews:black_tea",
            "herbalbrews:hibiscus_tea",
            "herbalbrews:lavender_tea",
            "herbalbrews:yerba_mate_tea",
            "herbalbrews:rooibos_tea",
            "herbalbrews:oolong_tea"
        ]
    },
    nethervinery: {
        3: itemList.nethervinery.wines
    },
    vinery: {
        3: itemList.vinery.wines
    }
}

export { hydration, ingredient_tags_replacement, custom_tags }
