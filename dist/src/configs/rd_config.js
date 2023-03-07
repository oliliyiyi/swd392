"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const redis_1 = __importDefault(require("redis"));
const client = redis_1.default.createClient({
    socket: {
        host: 'redis-13014.c292.ap-southeast-1-1.ec2.cloud.redislabs.com',
        port: 13014
    },
    password: 'Sf2LzoaynIusi8EMEVE1Vk4y3L0wlf2K'
});
client.on('connect', () => {
    console.log('Connected to Redis');
});
client.on('error', err => {
    console.log('Error ' + err);
});
