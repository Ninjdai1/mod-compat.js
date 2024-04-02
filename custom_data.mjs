const data = {
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
        3: data.nethervinery.wines
    },
    vinery: {
        3: data.vinery.wines
    }
}

const cuttables = {
    bakery: [
        {
            input: [{item: "bakery:apple_pie"}],
            output: [{item: "bakery:apple_pie_slice", count: 4}],
        },
        {
            input: [{item: "bakery:strawberry_cake"}],
            output: [{item: "bakery:strawberry_cake_slice", count: 4}],
        },
        {
            input: [{item: "bakery:sweetberry_cake"}],
            output: [{item: "bakery:sweetberry_cake_slice", count: 4}],
        },
        {
            input: [{item: "bakery:chocolate_cake"}],
            output: [{item: "bakery:chocolate_cake_slice", count: 4}],
        },
        {
            input: [{item: "bakery:bundt_cake"}],
            output: [{item: "bakery:bundt_cake_slice", count: 4}],
        },
        {
            input: [{item: "bakery:linzer_tart"}],
            output: [{item: "bakery:linzer_tart_slice", count: 4}],
        },
        {
            input: [{item: "bakery:glowberry_tart"}],
            output: [{item: "bakery:glowberry_tart_slice", count: 4}],
        },
        {
            input: [{item: "bakery:chocolate_tart"}],
            output: [{item: "bakery:chocolate_tart_slice", count: 4}],
        },
    ],
    meadow: [
        {
            input: [{item: "meadow:cheesecake"}],
            output: [{item: "meadow:cheesecake_slice", count: 4}],
        },
        {
            input: [{item: "meadow:cheese_tart"}],
            output: [{item: "meadow:cheese_tart_slice", count: 4}],
        },
        {
            input: [{item: "meadow:cheese_block"}],
            output: [{item: "meadow:piece_of_cheese", count: 4}],
        },
        {
            input: [{item: "meadow:amethyst_cheese_block"}],
            output: [{item: "meadow:piece_of_amethyst_cheese", count: 4}],
        },
        {
            input: [{item: "meadow:buffalo_cheese_block"}],
            output: [{item: "meadow:piece_of_buffalo_cheese", count: 4}],
        },
        {
            input: [{item: "meadow:goat_cheese_block"}],
            output: [{item: "meadow:piece_of_goat_cheese", count: 4}],
        },
        {
            input: [{item: "meadow:grain_cheese_block"}],
            output: [{item: "meadow:piece_of_grain_cheese", count: 4}],
        },
        {
            input: [{item: "meadow:sheep_cheese_block"}],
            output: [{item: "meadow:piece_of_sheep_cheese", count: 4}],
        },
        {
            input: [{item: "meadow:grain_cheese_block"}],
            output: [{item: "meadow:piece_of_warped_cheese", count: 4}],
        },
    ]
}

const vinery_bushes = [
    {
        seed: "vinery:red_grape_seeds",
        bush: "vinery:red_grape_bush",
        item: "vinery:red_grape",
        categories: ["dirt"],
    },
    {
        seed: "vinery:savanna_grape_seeds_red",
        bush: "vinery:savanna_grape_bush_red",
        item: "vinery:savanna_grapes_red",
        categories: ["dirt"],
    },
    {
        seed: "vinery:taiga_grape_seeds_red",
        bush: "vinery:taiga_grape_bush_red",
        item: "vinery:taiga_grapes_red",
        categories: ["dirt"],
    },
    {
        seed: "vinery:jungle_grape_seeds_red",
        bush: "vinery:jungle_grape_bush_red",
        item: "vinery:jungle_grapes_red",
        categories: ["dirt"],
    },
    {
        seed: "vinery:white_grape_seeds",
        bush: "vinery:white_grape_bush",
        item: "vinery:white_grape",
        categories: ["dirt"],
    },
    {
        seed: "vinery:savanna_grape_seeds_white",
        bush: "vinery:savanna_grape_bush_white",
        item: "vinery:savanna_grapes_white",
        categories: ["dirt"],
    },
    {
        seed: "vinery:taiga_grape_seeds_white",
        bush: "vinery:taiga_grape_bush_white",
        item: "vinery:taiga_grapes_white",
        categories: ["dirt"],
    },
    {
        seed: "vinery:jungle_grape_seeds_white",
        bush: "vinery:jungle_grape_bush_white",
        item: "vinery:jungle_grapes_white",
        categories: ["dirt"],
    },
    {
        seed: "nethervinery:crimson_grape_seeds",
        bush: "nethervinery:crimson_grape_bush",
        item: "nethervinery:crimson_grape",
        categories: ["crimson_nylium"],
    },
    {
        seed: "nethervinery:warped_grape_seeds",
        bush: "nethervinery:warped_grape_bush",
        item: "nethervinery:warped_grape",
        categories: ["warped_nylium"],
    },
];

export { hydration, vinery_bushes, cuttables, data };
