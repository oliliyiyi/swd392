import redis from 'redis';
const client = redis.createClient({
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
