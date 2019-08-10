import Express from "express";
import bodyParser from "body-parser";
import "./api/textlint/improt-rule";
import { TextLintEngine } from "textlint";
import { createConfig } from "./api/textlint/create-config";
import { Request } from "express-serve-static-core";

export const lint = (text: string, textlintrc: object) => {
    console.log(text, textlintrc);
    const engines = new TextLintEngine(createConfig(textlintrc));
    return engines.executeOnText(text, ".md");
};
const parseJSON = (body: string): object | Error => {
    try {
        return JSON.parse(body);
    } catch (error) {
        return error;
    }
};
const app = Express();
app.use(bodyParser.json());
app.post("/", async (req: Request, res) => {
    const body: { textlintrc: string, text: string; } = req.body;
    const text = body.text;
    if (!text) {
        return res.status(400).send("{ text } not defined");
    }
    const textlintrc = parseJSON(body.textlintrc);
    if (textlintrc instanceof Error) {
        return res.status(400).send(`"{ textlintrc } can not parsed"
        
${textlintrc.message}`);
    }
    const [result] = await lint(text, textlintrc);
    return res.send({
        ok: result.messages.length === 0,
        messages: result.messages
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
export default app;
