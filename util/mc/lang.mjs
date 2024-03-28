
function getLangsFromFiles(files){
    const langs = {};
    for (const path in files) {
        if (files.hasOwnProperty(path) && path.includes("assets/") && path.includes("/lang/") && path.endsWith("en_us.json")) {
            console.log(path)
            const json = JSON.parse(files[path].toString());
            const lang = path.substring(path.length-10, path.length-5);
            langs[lang] = json;
        }
    }
    return langs;
}

export {
    getLangsFromFiles
}
