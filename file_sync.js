const fsAsync = require("fs/promises");
const path = require("path");
const { info, warn, error } = require("./utils/logger")("fileSync");

async function copyFiles(source, target) {
    try {
        const dirSource = await fsAsync.readdir(source, { recursive: true });
        const dirTarget = await fsAsync.readdir(target, { recursive: true });

        for (const file of dirSource) {
            if (dirTarget.includes(file)) {
                warn(`File or directory by path ${file} already exists.`);
                continue;
            }

            const src = path.resolve(source, file);
            const dest = path.resolve(target, file);

            try {
                (await fsAsync.stat(src)).isDirectory()
                    ? await fsAsync.mkdir(dest)
                    : await fsAsync.copyFile(src, dest).then(() => info(`File ${file} copied successfully`));
            } catch (err) {
                error(err.message);
            }
        }
    } catch (err) {
        error(err.message);
    }
}

async function start() {
    const source = path.join(__dirname, "source");
    const target = path.join(__dirname, "target");

    await copyFiles(source, target);
}

module.exports = {
    start,
};