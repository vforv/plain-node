import { IncomingMessage, ServerResponse } from "http";
import { StringDecoder } from "string_decoder";
import url, { UrlWithParsedQuery } from "url";
import { router } from "./handlers";

export class ReqRes {
    public path = "/";
    public parsedUrl: UrlWithParsedQuery;
    public queryStringObject: any;
    public headers: any;
    public method?: "post" | "get" | "put" | "delete";

    constructor(public req: IncomingMessage, public res: ServerResponse) {
        this.parsedUrl = url.parse(this.req.url || "/", true);
    }

    public setPath() {
        // Get the path
        const path = this.parsedUrl.path;
        this.path = path?.replace(/^\/+|\/+$/g, "") || "/";
        return this;
    }

    public setQueryString() {
        // Get the query string as object
        this.queryStringObject = this.parsedUrl.query;

        return this;
    }

    public setHeaders() {
        // Get headers
        this.headers = this.req.headers;
        return this;
    }

    public setMethod() {
        this.method = (this.req as any).method?.toLocaleLowerCase();
        return this;
    }

    public setPayloadHandling() {
        // Get the payload, if any
        const decoder = new StringDecoder("utf-8");
        let buffer = "";
        this.req.on("data", (data) => {
            buffer += decoder.write(data);
        });
        this.req.on("end", () => {
            buffer += decoder.end();

            // Get handler
            const handler =
                typeof (router as any)[this.path as any] !== "undefined"
                    ? (router as any)[this.path as any]
                    : router["notFound"];

            const data = {
                path: this.path,
                queryStringObject: this.queryStringObject,
                method: this.method,
                headers: this.headers,
                payload: buffer,
            };
            // route request to speific handler
            handler(data, (statusCode = 404, payload: any) => {
                // validate payload and status code
                statusCode = typeof statusCode === "number" ? statusCode : 200;
                payload = typeof payload === "object" ? payload : {};

                // Convert payload to string
                const payloadString = JSON.stringify(payload);

                // return response
                this.res.setHeader("Content-Type", "application/json");
                this.res.writeHead(statusCode);
                this.res.end(payloadString);
                // Log the request path
                console.log(payload);
            });
        });
    }
}
