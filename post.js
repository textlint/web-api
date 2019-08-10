const fetch = require("node-fetch");
(async () => {
    try {
        const result = await fetch("https://web-api.textlint.now.sh/", {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                textlintrc: {
                    "rules": {
                        "sentence-length": {
                            "max": 5
                        }
                    }
                },
                text: "- [ ] Todo text"
            })
        }).then(res => {
            if (!res.ok) {
                return res.text().then(responseText => {
                    return Promise.reject(new Error(responseText));
                });
            }
            return res.json();
        });
        console.log(result);
    } catch (error) {
        console.error(error);
    }
})();
