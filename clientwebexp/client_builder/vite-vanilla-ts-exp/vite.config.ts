import { defineConfig } from "vite";
import fs from "fs";

export default defineConfig({
    server: {
        https: {
            key: fs.readFileSync("../tls/privkey.pem"),
            cert: fs.readFileSync("../tls/cert.pem"),
        },
        // port: 443
    }
});
