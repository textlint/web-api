import Express from "express";
import { Request } from "express-serve-static-core";
import packageList from "../../resources/package-list.json";

const app = Express();
app.get("/api/list", (_req: Request, res) => {
    res.json(packageList);
});

export default app;
