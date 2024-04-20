import { dateToUnixTime } from "./utils.mjs";

const MODRINTH_API = "https://api.modrinth.com/v2"

async function listVersions({project, loaders=["fabric"], game_versions=["1.20.1"]}) {
    const response = await fetch(`${MODRINTH_API}/project/${project}/version`, {
        loaders: loaders,
        game_versions: game_versions,
    });
    const versions = await response.json();
    return versions;
}

async function getLatestVersions({project, game_version}) {
    const latestVersions = {}
    for(const version of await listVersions({project: project})){
        for(const loader of version.loaders){
            if(!latestVersions[loader] || dateToUnixTime(version.date_published) > latestVersions[loader]?.timestamp){
                if(!game_version || version.game_version.includes(game_version)){
                    latestVersions[loader] = { timestamp: dateToUnixTime(version.date_published), id: version.id, version_number: version.version_number, files: version.files }
                }
            }
        }
    }
    return latestVersions;
}

export { getLatestVersions }
