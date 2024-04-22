import path from "path";
import TOML from "fast-toml";
import fs from "fs";
import semver from "semver";
import { Readable } from 'stream';
import { finished } from 'stream/promises';

import { getLatestVersions } from "./util/api/modrinth.mjs";
import { readZipArchive } from "./util/zip/read.mjs";

const MODRINTH_MODS = [
    { id: "bakery",  slug: "lets-do-bakery", loaders: ["fabric", "forge", "quilt", "neoforge"]},
    { id: "beachparty",  slug: "lets-do-beachparty", loaders: ["fabric", "forge", "quilt", "neoforge"]}, 
    { id: "bloomingnature",  slug: "lets-do-bloomingnature", loaders: ["fabric", "forge", "quilt", "neoforge"]},
    { id: "brewery",  slug: "lets-do-brewery", loaders: ["fabric", "forge", "quilt", "neoforge"]},
    { id: "candlelight",  slug: "lets-do-candlelight", loaders: ["fabric", "forge", "quilt", "neoforge"]},   
    { id: "herbalbrews",  slug: "lets-do-herbalbrews", loaders: ["fabric", "forge", "quilt", "neoforge"]},
    { id: "meadow",  slug: "lets-do-meadow", loaders: ["fabric", "forge", "quilt", "neoforge"]},
    { id: "nethervinery",  slug: "lets-do-nethervinery", loaders: ["fabric", "forge", "quilt", "neoforge"]},
    { id: "vinery",  slug: "lets-do-vinery", loaders: ["fabric", "forge", "quilt", "neoforge"]},

    { id: "delightful", slug: "delightful", loaders: ["forge", "neoforge"]},
    { id: "farmersdelight", slug: "farmers-delight", loaders: ["forge"]},
    { id: "expandeddelight", slug: "expanded-delight", loaders: ["fabric", "quilt"]},
    { id: "ends_delight", slug: "ends-delight", loaders: ["fabric", "forge"]},
    { id: "oceansdelight", slug: "oceans-delight", loaders: ["fabric", "forge"]},
    { id: "nethersdelight", slug: "nethers-delight", loaders: ["forge"]},
    { id: "ubesdelight", slug: "ubes-delight", loaders: ["fabric", "quilt"]},
    { id: "crabbersdelight", slug: "crabbers-delight", loaders: ["forge"]},
    { id: "festive_delight", slug: "festive-delight", loaders: ["fabric", "forge", "quilt"]},
    { id: "casualness_delight", slug: "casualness-delight", loaders: ["fabric", "forge", "quilt"]},
    { id: "corndelight", slug: "corn-delight", loaders: ["forge"]},
    { id: "miners_delight", slug: "miners-delight", loaders: ["forge", "neoforge"]},
    { id: "vegandelight", slug: "vegan-delight", loaders: ["forge"]},
    { id: "moredelight", slug: "more-delight", loaders: ["fabric", "forge"]},
    { id: "twilightdelight", slug: "twilight-delight", loaders: ["forge"]},
    { id: "frightsdelight", slug: "frights-delight", loaders: ["fabric", "quilt"]},
    { id: "argentinas_delight", slug: "argentinas-delight", loaders: ["forge"]},
    { id: "farmersdelight", slug: "farmers-delight-refabricated", loaders: ["fabric", "quilt"]},
    { id: "culturaldelights", slug: "cultural-delights-fabric", loaders: ["fabric"]},
    { id: "pineapple_delight", slug: "pineapple-delight", loaders: ["fabric", "forge"]},
    { id: "croptopiadelight", slug: "croptopia-delight", loaders: ["forge"]},
    { id: "sunflowerdelight", slug: "sunflower-delight", loaders: ["forge"]},
    { id: "nethersdelight", slug: "nethers-delight-refabricated", loaders: ["fabric", "quilt"]},
    
    { id: "create", slug: "create", loaders: ["forge", "neoforge"]},
    { id: "create", slug: "create-fabric", loaders: ["fabric", "quilt"]},
    { id: "createfood", slug: "create-food", loaders: ["fabric"]},
    //{ id: "", slug: "", loaders: []},
]

let cache;
if(fs.existsSync('./.update_cache.json')) cache = JSON.parse(fs.readFileSync('./.update_cache.json', 'utf8'));
else cache = {};

for(const mod of MODRINTH_MODS){
    const metadata = {}
    if(!cache[mod.slug]) cache[mod.slug] = {};
    for(const loader of mod.loaders){
        if(fs.existsSync(path.resolve(`./mods/${loader}/${mod.id}.jar`))){
            const modFiles = readZipArchive(path.resolve(`./mods/${loader}/${mod.id}.jar`));
            const md = getLoaderMetadata(modFiles);
            metadata[loader] = md.version || md.mods[0].version
        } else {
            metadata[loader] = undefined
        }
    }
    console.log(`\n${mod.id} (${mod.slug}):`)
    const versions = await getLatestVersions({ project: mod.slug });
    for(const loader of Object.keys(versions)){
        if(!versions[loader] || versions[loader].version_number == metadata[loader]) continue;
        //console.log(`Old version: ${metadata[loader]} - New version: ${versions[loader].version_number} (${loader})`)
        if(!metadata[loader] || !(semver.valid(metadata[loader])) || !(semver.valid(versions[loader].version_number)) || semver.gt(semver.valid(versions[loader].version_number), semver.valid(metadata[loader]))){
            if(cache[mod.slug][loader] && versions[loader].version_number == cache[mod.slug][loader]) continue;
            console.log(`Update available for ${loader}: ${metadata[loader]} -> ${versions[loader].version_number} (${versions[loader].id})`)
            await downloadToFolder({
                url: getModrinthPrimaryFile(versions[loader].files).url,
                loader: loader,
                id: mod.id
            })
            cache[mod.slug][loader] = versions[loader].version_number;
            console.log(`Update for ${mod.id}(${loader}) downloaded !`)
        }
    }
}
fs.writeFileSync('./.update_cache.json', JSON.stringify(cache));

async function downloadToFolder({url, loader, id}){
    const filePath = path.resolve(`./mods/${loader}/${id}.jar`)
    if(fs.existsSync(filePath)) fs.rmSync(filePath)
    const fileStream = fs.createWriteStream(filePath, { flags: 'wx' });
    const res = await fetch(url);
    await finished(Readable.fromWeb(res.body).pipe(fileStream));
}

function getModrinthPrimaryFile(files){
    return files.find(obj => {
        return obj.primary;
    })
}

function getLoaderMetadata(modFiles){
    for (let index = 0; index < modFiles.length; index++) {
        const element = modFiles[index];
        if(element.entryName.endsWith("fabric.mod.json") || element.entryName.endsWith("quilt.mod.json")){
            return JSON.parse(element.getData().toString());
        }
        if(element.entryName.endsWith("mods.toml")){
            return TOML.parse(element.getData().toString());
        }
    }
}
