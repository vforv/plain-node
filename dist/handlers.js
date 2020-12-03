"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
// Define handers
const handlers = {};
// Sample handler
handlers.sample = function (data, callback) {
    console.log(data.payload);
    callback(406, { name: process.env.PORT });
};
// Not found handler
handlers.notFound = function (data, callback) {
    callback(404);
};
// Define router
exports.router = {
    sample: handlers.sample,
    notFound: handlers.notFound,
};
