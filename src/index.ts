import Express from "express";
import bodyParser from "body-parser";
import "./api/textlint/improt-rule";
import { TextLintEngine } from "textlint";
import { createConfig } from "./api/textlint/create-config";
import { Request } from "express-serve-static-core";
require("textlint-rule-sentence-length")
const app = Express();
app.use(bodyParser.json());
app.get("/", async (_req, res) => {
    console.log("http://localhost:3000/list/package");
    res.send({
        status: "ok",
        results: {}
    });
});
app.use(function(err: any, _req: any, res: any, next: any) {
    if (res.headersSent) {
        return next(err);
    }
    console.log("next error");
    res.status(500);
    res.render("error", { error: err });
});
export const lint = (text: string, textlintrc: object) => {
    console.log(text, textlintrc);
    const engines = new TextLintEngine(createConfig(textlintrc));
    return engines.executeOnText(text);
};
app.use(bodyParser.json());
app.post("/", async (req: Request, res) => {
    const body: { textlintrc: string, text: string; } = req.body;
    console.log(require("textlint-rule-sentence-length"));
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
