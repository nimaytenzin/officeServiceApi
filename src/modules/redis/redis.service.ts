import { Inject, Injectable } from "@nestjs/common";
import { REDIS_PUBLISHER } from "src/core/constants";
import { RedisClient } from "./redis.providers";

@Injectable()
export class RedisService{
    public constructor(
        @Inject(REDIS_PUBLISHER)
        private readonly redisPublisher: RedisClient
    ){}
    
    public async publish(channel: string, value: unknown): Promise<number>{
        return new Promise<number>((resolve,reject)=>{
            return this.redisPublisher.publish(channel,JSON.stringify(value),(error,reply)=>{
                if(error){
                    console.log(error);
                    return reject(error);
                }
                console.log(reply)
                return resolve(reply);
            })
        })
    }
}