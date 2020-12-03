// Define handers
const handlers: any = {};

// Sample handler
handlers.sample = function (data: any, callback: any) {
    console.log(data.payload);
    callback(406, { name: process.env.PORT });
};

// Not found handler
handlers.notFound = function (data: any, callback: any) {
    callback(404);
};

// Define router
export const router = {
    sample: handlers.sample,
    notFound: handlers.notFound,
};
