const fs = require("fs");
const path = require("path");
const fetch = require("node-fetch");
const textlintrc = fs.readFileSync(path.join(__dirname, ".textlintrc.json"), "utf-8");
(async () => {
    const result = await fetch("https://web-api.textlint.now.sh", {
        method: "POST",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            textlintrc,
            text: "これはOKです"
        })
    }).then(res => res.json());
    console.log(result);
})();
