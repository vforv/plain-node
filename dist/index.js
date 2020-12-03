"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = __importDefault(require("http"));
const envs_1 = require("./envs");
const req_res_1 = require("./req-res");
if (!process.env.ENV) {
    envs_1.loadEnv();
}
// create http server
const server = http_1.default.createServer((req, res) => {
    const reqResHandling = new req_res_1.ReqRes(req, res);
    reqResHandling.setPath().setHeaders().setMethod().setPayloadHandling();
});
// start listening
server.listen(process.env.PORT, () => {
    console.log(`Server listening on port ${process.env.PORT}`);
});
