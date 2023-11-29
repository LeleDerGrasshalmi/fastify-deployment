# fastify-deployment

This plugin registers a route, that can be called from e.g. github actions on push to update the source code of the server.

## Installation

Since this is not published as a npm package currently, you need to reference this github repo as the package source.

`github:LeleDerGrasshalmi/fastify-deployment`

## Usage

```ts
import fastify from "fastify";
import triggerUpdatePlugin from "fastify-deployment";

const server = fastify();

await server.register(triggerUpdatePlugin, {
  secret: "some_random_secret_like_a_uuid",
  scriptPath: "/path/to/script",
  routeName: "/update", // optional, defaults to /trigger-update
});

await server.listen({ port: 3000 });
```

## Triggering the update

POST `<protocol>://<host><routePrefix><routeName>`, along with the secret in the `Authorization` header.

Example call with curl with the configuration from above:

```bash
curl -i -X POST --header "Authorization: some_random_secret_like_a_uuid" http://localhost:3000/update
```

Successful response example:

```http
HTTP/1.1 200 OK
content-type: application/json; charset=utf-8
content-length: 30
Date: Tue, 28 Nov 2023 20:18:20 GMT
Connection: keep-alive
Keep-Alive: timeout=72

{"message":"Triggered update"}
```
