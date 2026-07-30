import express from "express";
import path from "path";

import fs from "fs";
import { ENV } from "./lib/env.js";

const app = express();

const root = path.resolve();
const frontendPath = path.join(root, "Frontend", "dist");


const root = path.resolve();
const frontendPath = path.join(root, "Frontend", "dist");

console.log("Root:", root);
console.log("Frontend Path:", frontendPath);
console.log("Exists:", fs.existsSync(frontendPath));

const PORT = ENV.PORT || 3000;

app.get("/health", (req, res) => {
    res.json({ msg: "Success from backend" });
});

if (ENV.NODE_ENV === "production") {
    app.use(express.static(frontendPath));

    app.get("/{*any}", (req, res) => {
        res.sendFile(path.join(frontendPath, "index.html"));
    });
}

app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`);
});