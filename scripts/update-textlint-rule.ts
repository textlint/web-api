import fs from "fs";
import path from "path";

const search = require("libnpmsearch");
type Package = {
    title: string;
    href: string;
}

export function isPackage(element: any): element is Package {
    return element.href && element.title;
}

export interface NpmPackage {
    name: string;
    scope: string;
    version: string;
    description: string;
    keywords: string[];
    T07: number;
    links: ILinks;
    author: IAuthor;
    publisher: IPublisher;
    maintainers: IMaintainersItem[];
}

interface ILinks {
    npm: string;
    homepage: string;
    repository: string;
    bugs: string;
}

interface IAuthor {
    name: string;
    url: string;
}

interface IPublisher {
    username: string;
    email: string;
}

interface IMaintainersItem {
    username: string;
    email: string;
}

export function isTextlintRulePacakage(name: string) {
    return /^textlint-rule-/.test(name) || /^@.*?\/textlint-rule-/.test(name);
}

export function createImportsMap(packages: NpmPackage[]): string {
    return packages.map(pkg => {
        return `import "${pkg.name}"`;
    }).join("\n");
}

const DENY_LIST = ["textlint-rule-languagetool", "textlint-rule-spellchecker", "textlint-rule-helper", "textlint-rule-eslint"];

export async function fetchTextlintRules(): Promise<NpmPackage[]> {
    const results: NpmPackage[] = [];
    const limit = 200;
    let from = 0;
    let isContinue = true;
    while (isContinue) {
        const newPackages = await search("\"textlint-rule\"", {
            from,
            limit
        });
        newPackages.forEach((pkg: NpmPackage) => {
            if (DENY_LIST.includes(pkg.name)) {
                return;
            }
            if (!isTextlintRulePacakage(pkg.name)) {
                return;
            }
            if (results.some(result => result.name === pkg.name)) {
                return;
            }
            results.push(pkg);
        });
        isContinue = newPackages.length >= limit;
        if (isContinue) {
            from++;
        }
    }
    return results;
}

const NOW_BUILD = process.env.NOW_BUILD;
(async () => {
    if (require.main !== module) {
        return;
    }
    if (NOW_BUILD) {

    }
    const packages = await fetchTextlintRules();
    const outputJSONPath = path.join(__dirname, "../src/resources/package-list.json");
    const importMapPath = path.join(__dirname, "../src/api/textlint/improt-rule.ts");
    fs.writeFileSync(outputJSONPath, JSON.stringify(packages), "utf-8");
    console.log(`Update ${outputJSONPath}`);
    const importCode = createImportsMap(packages);
    fs.writeFileSync(importMapPath, importCode, "utf-8");
    console.log(`Update ${importMapPath}`);
})();
