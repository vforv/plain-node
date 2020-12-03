"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReqRes = void 0;
const string_decoder_1 = require("string_decoder");
const url_1 = __importDefault(require("url"));
const handlers_1 = require("./handlers");
class ReqRes {
    constructor(req, res) {
        this.req = req;
        this.res = res;
        this.path = "/";
        this.parsedUrl = url_1.default.parse(this.req.url || "/", true);
    }
    setPath() {
        // Get the path
        const path = this.parsedUrl.path;
        this.path = (path === null || path === void 0 ? void 0 : path.replace(/^\/+|\/+$/g, "")) || "/";
        return this;
    }
    setQueryString() {
        // Get the query string as object
        this.queryStringObject = this.parsedUrl.query;
        return this;
    }
    setHeaders() {
        // Get headers
        this.headers = this.req.headers;
        return this;
    }
    setMethod() {
        var _a;
        this.method = (_a = this.req.method) === null || _a === void 0 ? void 0 : _a.toLocaleLowerCase();
        return this;
    }
    setPayloadHandling() {
        // Get the payload, if any
        const decoder = new string_decoder_1.StringDecoder("utf-8");
        let buffer = "";
        this.req.on("data", (data) => {
            buffer += decoder.write(data);
        });
        this.req.on("end", () => {
            buffer += decoder.end();
            // Get handler
            const handler = typeof handlers_1.router[this.path] !== "undefined"
                ? handlers_1.router[this.path]
                : handlers_1.router["notFound"];
            const data = {
                path: this.path,
                queryStringObject: this.queryStringObject,
                method: this.method,
                headers: this.headers,
                payload: buffer,
            };
            // route request to speific handler
            handler(data, (statusCode = 404, payload) => {
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
exports.ReqRes = ReqRes;
