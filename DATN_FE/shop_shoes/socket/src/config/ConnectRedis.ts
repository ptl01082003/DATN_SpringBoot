import { RedisClientType } from "@redis/client";
import { createClient } from "redis";

class Redis {
  public redis!: RedisClientType;
  async initial() {
    try {
      this.redis = createClient();
      await this.redis.connect();
      console.log("create new a connection to redis server");
    } catch (error) {
      console.log("error connecting to redis server:: ", error);
    }
  }
  async get(key: string): Promise<string | null> {
    const value = await this.redis.get(key);
    return value;
  }
  async set(key: string, value: string) {
    await this.redis.set(key, value);
  }
  async setEx(key: string, value: string) {
    await this.redis.set(key, value);
  }
  async del(key: string) {
    await this.redis.del(key);
  }
}

export const redis = new Redis();
