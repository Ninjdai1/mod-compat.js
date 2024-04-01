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

export { vinery_bushes, cuttables };
