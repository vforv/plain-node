"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loadEnv = void 0;
function loadEnv() {
    process.env.ENV = "dev";
    process.env.PORT = "3000";
}
exports.loadEnv = loadEnv;
