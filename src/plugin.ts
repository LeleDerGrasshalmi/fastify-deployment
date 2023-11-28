import { SpawnOptions, spawn } from "child_process";
import { FastifyInstance } from "fastify";
import { FastifyUpdateOptions } from "./types/index.js";
import { existsSync } from "fs";

const triggerUpdatePlugin = async (instance: FastifyInstance, options: FastifyUpdateOptions) => {
    if (typeof options !== "object") {
        throw new TypeError("Invalid or missing options");
    }

    if (typeof options.secret !== "string") {
        throw new TypeError("Invalid or missing 'secret' option");
    }

    if (typeof options.scriptPath !== "string") {
        throw new TypeError("Invalid or missing 'secret' option");
    }

    if (options.routeName && typeof options.routeName !== "string") {
        throw new TypeError("Invalid 'routeName' option");
    }

    if (!existsSync(options.scriptPath)) {
        throw new Error(`The script path '${options.scriptPath}' does not exist`);
    }

    const routeName = options.routeName ?? "/trigger-update";
    const spawnOptions: SpawnOptions = {
        detached: true,
        stdio: 'ignore'
    } as const;

    instance.post(routeName, async (req, res) => {
        if (req.headers.authorization !== options.secret) {
            return res
                .status(403)
                .send({
                    message: "Invalid or missing secret"
                });
        }

        // https://stackoverflow.com/a/12871847
        spawn(options.scriptPath, spawnOptions);

        await res
            .status(200)
            .send({
                message: "Triggered update"
            });

        process.exit();
    });
}

export default triggerUpdatePlugin;