import Express from "express";
import bodyParser from "body-parser";
import "./api/textlint/improt-rule";

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

export default app;
