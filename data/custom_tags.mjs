import { itemList } from "./custom_data.mjs";

const ingredient_tags_replacement = {
    "": ""
};

const custom_tags = {
    items: {
        "cheeses.json": [
            "#$loader$:cheese"
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
                "meadow:piece_of_goat_cheese"
            ]
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
