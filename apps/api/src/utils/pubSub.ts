// @ts-nocheck
import { RedisPubSub } from "graphql-redis-subscriptions";
import Redis from "ioredis";

const { REDIS_URL = "//localhost:6379", REDIS_PASSWORD } = process.env;

const pubSub = new RedisPubSub({
  publisher: REDIS_PASSWORD
    ? new Redis(REDIS_URL, { password: REDIS_PASSWORD })
    : new Redis(REDIS_URL),
  subscriber: REDIS_PASSWORD
    ? new Redis(REDIS_URL, { password: REDIS_PASSWORD })
    : new Redis(REDIS_URL),
});

export default pubSub;
