"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.client = void 0;
// import redis from 'redis';
const redis = require('async-redis');
exports.client = redis.createClient({ url: `redis://default:Sf2LzoaynIusi8EMEVE1Vk4y3L0wlf2K@redis-13014.c292.ap-southeast-1-1.ec2.cloud.redislabs.com:13014` });
// Kiểm tra kết nối
exports.client.on('connect', () => {
    console.log('Connected to Redis');
});
// Xử lý lỗi kết nối
exports.client.on('error', (error) => {
    console.error('Error connecting to Redis:', error);
});
