import * as dotenv from 'dotenv';

export const envConfig = {
    PORT: process.env.PORT || 3003,
    PROXY: process.env.PROXY,
    PG_CONNECTION_STRING: "postgres://postgres:12345678@localhost:5432/postgres",
}