import fs from "fs";
import path from "path";
import { exec } from "child_process";
import packages from "../src/resources/package-list.json";
import shellescape = require("shell-escape");

const NOW_BUILD = process.env.NOW_BUILD;
(async () => {
    if (require.main !== module) {
        return;
    }
    if (NOW_BUILD) {
        console.log("NOW BUILD");
    }
    const packageJSONPath = path.join(__dirname, "../package.json");
    fs.copyFileSync(packageJSONPath, packageJSONPath + ".bak");
    console.log("# Backup package.json.bak");

    const packageNames = shellescape(packages.map(pkg => pkg.name));
    console.log(`# Install`);
    console.log(`$ yarn add ${packageNames} --ignore-script`);
    const stream = exec(`yarn add ${packageNames} --ignore-script`, {
        cwd: path.join(__dirname, "../")
    });
    stream.stdout && stream.stdout.pipe(process.stdout);
    stream.stderr && stream.stderr.pipe(process.stderr);
})();
