## Javascript compat generator

My utility to create the [[Let's Do Addon] Compat pack](https://github.com/Ninjdai1/letsdo-addon-compat).

Uses node.js and the following libraries:
* adm-zip
* fast-toml
* semver

To use it, place mods in the mods/loader/ directory in the root of the project. THE MOD's FILE MUST BE ITS INGAME ID !
(Example: mods/fabric/meadow.jar)

Then, install the required packages through `npm install`. Once done, run `node index.mjs`

Some mods can be downloaded from modrinth to ease the update process by running
The download utility is provided as is, with no security guarantee. Please refrain from spamming modrinth's api with it.


Notes to contributors:
* Adding recipe compat is straightforward: in recipes.mjs, write a function that converts a mod's crafting recipes to another one's, then add it to the recipe switch.
* Custom data such as hydration values and original recipes (not originally added by a mod, such as cutting cheese with Farmer's Delight cutting board) are handled in the data/ directory

How to reach out:
* On Github, through issues
* On [Discord](https://discord.gg/Vddst9txP8)
