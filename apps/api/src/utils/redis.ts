import Redis from "ioredis";


const { REDIS_URL = "//localhost:6379", REDIS_PASSWORD } = process.env;
const redis = REDIS_PASSWORD ? new Redis(REDIS_URL, { password: REDIS_PASSWORD }) : new Redis(REDIS_URL);

export default redis;
