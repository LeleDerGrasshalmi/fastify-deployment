import fastify from "fastify";
import triggerUpdatePlugin from "../src/plugin.js";
import { resolve } from "path";

async function main() {
    const server = fastify();

    await server.register(triggerUpdatePlugin, {
        secret: "some_random_secret_like_a_uuid",
        scriptPath: resolve("tests/update.bat"),
    });

    const address = await server.listen({ port: 3000 });
    console.info(`Listening on ${address}`);
}

main();