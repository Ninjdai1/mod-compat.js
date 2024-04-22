const containers = {
    items: [
        "createfood:cacao_mass_bucket",
        "farmersdelight:milk_bottle",
        "farmersdelight:nether_salad",
        "farmersdelight:tomato_sauce",
        "meadow:wooden_bucket",
        "minecraft:bowl",
        "minecraft:glass_bottle",
        "minecraft:honey_bottle",
        "minecraft:milk_bucket",
        "minecraft:water_bucket",
        "minecraft:suspicious_stew",
        "minecraft:dragon_breath",
        "ubesdelight:condensed_milk_bottle",
        "ubesdelight:fish_sauce_bottle",
        "ubesdelight:sinangag",
    ],
    tags: [
        "c:milk",
        "c:milks",
        "c:water_buckets",
        "meadow:milk",
        "meadow:water_bottles"
    ]
}

const FLUID_BUCKET_QTY = {
    forge: 250,
    c: 27000
}

const liquid_containers = (loader_id) => {
    return {
        items: {
            "minecraft:milk_bucket": {
                amount: FLUID_BUCKET_QTY[loader_id],
                fluidTag: `${loader_id}:milk`
            },
            "minecraft:water_bucket": {
                amount: FLUID_BUCKET_QTY[loader_id],
                fluidTag: `${loader_id}:water`
            }
        },
        tags: {
            "c:water_buckets": {
                amount: FLUID_BUCKET_QTY[loader_id],
                fluidTag: `${loader_id}:water`
            }
        }
    }
}

const itemList = {
    vinery: {
        wines: [
            "vinery:chenet_wine",
            "vinery:lilitu_wine",
            "vinery:noir_wine",
            "vinery:bolvar_wine",
            "vinery:stal_wine",
            "vinery:kelp_cider",
            "vinery:bottle_mojang_noir",
            "vinery:cherry_wine",
            "vinery:red_wine",
            "vinery:creepers_crush",
            "vinery:cristel_wine",
            "vinery:jellie_wine",
            "vinery:jo_special_mixture",
            "vinery:villagers_fright",
            "vinery:clark_wine",
            "vinery:mellohi_wine",
            "vinery:strad_wine",
            "vinery:eiswein",
            "vinery:strad_wine",
            "vinery:aegis_wine",
            "vinery:solaris_wine",
            "vinery:chorus_wine",
            "vinery:knulp_wine",
            "vinery:glowing_wine",
            "vinery:creepers_crush",
            "vinery:cristel_wine",
            "vinery:jellie_wine",
            "vinery:jo_special_mixture",
            "vinery:villagers_fright",
            "vinery:cherry_wine",
            "vinery:magnetic_wine",
            "vinery:chorus_wine",
            "vinery:apple_cider",
            "vinery:kelp_cider",
            "vinery:solaris_wine",
            "vinery:jellie_wine",
            "vinery:aegis_wine",
            "vinery:apple_wine"
        ]
    },
    nethervinery: {
        wines: [
            "nethervinery:nether_fizz",
            "nethervinery:blazewine_pinot",
            "nethervinery:ghastly_grenache",
            "nethervinery:netherite_nectar",
            "nethervinery:lava_fizz",
            "nethervinery:improved_lava_fizz",
            "nethervinery:improved_nether_fizz"
        ]
    }
}


export { itemList, containers, liquid_containers };
