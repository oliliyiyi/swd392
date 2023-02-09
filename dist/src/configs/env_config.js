"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.envConfig = void 0;
exports.envConfig = {
    PORT: process.env.PORT || 3003,
    PROXY: process.env.PROXY,
    PG_CONNECTION_STRING: "postgres://postgres:12345678@localhost:5432/postgres",
};
