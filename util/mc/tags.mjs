
function getTagsFromFiles(files){
    const tags = {};
    for (const path in files) {
        if (files.hasOwnProperty(path) && path.includes("/tags/") && path.endsWith(".json")) {
            let json = JSON.parse(files[path].toString());
            const tag = path.split("/data/")[1];

            if(!tag){
                continue;
            }
            if(tags[tag]?.length > 0){
                tags[tag].push(json);
            } else {
                tags[tag] = [json];
            }
        }
    }
    return tags;
}

export {
    getTagsFromFiles
}
