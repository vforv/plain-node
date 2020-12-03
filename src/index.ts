import http from "http";
import { loadEnv } from "./envs";
import { ReqRes } from "./req-res";

if (!process.env.ENV) {
    loadEnv();
}

// create http server
const server = http.createServer((req, res) => {
    const reqResHandling = new ReqRes(req, res);
    reqResHandling.setPath().setHeaders().setMethod().setPayloadHandling();
});

// start listening
server.listen(process.env.PORT, () => {
    console.log(`Server listening on port ${process.env.PORT}`);
});
