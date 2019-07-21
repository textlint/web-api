import Express from "express";
import bodyParser from "body-parser";
import { Request } from "express-serve-static-core";
import { TextLintEngine } from "textlint";
import { createConfig } from "./create-config";
import "./improt-rule";
require("textlint-rule-joyo-kanj");

export const lint = (text: string, textlintrc: object) => {
    console.log(text, textlintrc);
    const engines = new TextLintEngine(createConfig(textlintrc));
    return engines.executeOnText(text);
};

const app = Express();
app.use(bodyParser.json());
app.post("/api/textlint", async (req: Request, res) => {
    const body: { textlintrc: string, text: string; } = req.body;
    console.log(require.resolve("textlint-rule-joyo-kanj"));
    const text = body.text;
    const textlintrc = JSON.parse(body.textlintrc);
    const results = await lint(text, textlintrc);
    console.log("results", results);
    res.send({
        status: "ok",
        results: results
    });
});

export default app;
