const fs = require("fs");
const path = require("path");
const fetch = require("node-fetch");
const textlintrc = fs.readFileSync(path.join(__dirname, ".textlintrc"), "utf-8");
(async () => {
    const result = await fetch("http://localhost:3000/", {
        method: "POST",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            textlintrc,
            text: "これはOKです"
        })
    });
    console.log(result);
})();
