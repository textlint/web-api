const fs = require("fs");
const path = require("path");
const fetch = require("node-fetch");
const textlintrc = fs.readFileSync(path.join(__dirname, ".textlintrc.json"), "utf-8");
(async () => {
    const API = process.env.NODE_ENV !== "production" ? "http://localhost:3000" : "https://web-api.textlint.now.sh";
    const result = await fetch(API, {
        method: "POST",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            textlintrc,
            text: "This is OK."
        })
    }).then(res => res.json());
    console.log(result);
})();
