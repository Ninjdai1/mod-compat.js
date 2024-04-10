
function getTagsFromFiles(files){
    const tags = {};
    for (const path in files) {
        if (files.hasOwnProperty(path) && path.includes("/tags/") && path.endsWith(".json")) {
            let json = JSON.parse(files[path].toString());
            //console.log(json)
            const tagName = path.split("/tags/")[1].replace(".json","");
            const origin = path.split("/")[1]
            const tag = `#${origin}:${tagName}`
            //console.log(tag)

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
