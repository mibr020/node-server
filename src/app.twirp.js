
import { createServer } from "http";
import { twirpServer } from "./servers/twirp.server.js"

const PORT = 8081;

// CORS
twirpServer.use(async (req, _ctx, next) => {
    if (req.method === "OPTIONS") {
        return {
            statusCode: 204,
            headers: {
                "access-control-allow-origin": "*",
                "access-control-request-method": "*",
                "access-control-allow-methods": "*",
                "access-control-allow-headers": "*",
                "content-type": "application/json",
            },
            body: "",
        };
    }

    const { statusCode, headers, body } = await next();
    return {
        statusCode,
        body,
        headers: {
            "access-control-allow-origin": "*",
            ...headers,
        },
    };
});

createServer(twirpServer).listen(PORT, () =>
    console.log(`Server listening on port ${PORT}`)
);