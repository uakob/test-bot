import * as _ from 'lodash';

import * as Redis from 'ioredis';

export class Storage {
  private readonly redis: any;
  private readonly config: { reCheckTime: any };

  constructor(
    reCheckTime: any,
    host: string,
    port: number,
  ) {
    this.config = { reCheckTime };
    this.redis = new Redis.Cluster([
      {
        host,
        port,
      },
    ]);
  }

  public async lock(requestId: number, time: number): Promise<boolean> {
    console.log(JSON.stringify({
      requestId,
      service: 'redis',
      value: 'CALL',
      call: 'lock',
    }));
    try {
      const res = await this.redis.set(requestId, '', 'EX', time * 60);
      console.log(JSON.stringify({
        service: 'redis',
        value: 'CALL',
        call: 'incr',
        counter: res,
      }));
    } catch (error) {
      console.log(error);
      console.log(JSON.stringify({
        requestId,
        error,
        service: 'redis',
        call: 'lock',
        value: 'ERROR',
      }));
      return false;
    }
    return true;
  }

  public async keys(): Promise<any> {
    console.log(JSON.stringify({
      service: 'redis',
      value: 'CALL',
      call: 'keys',
    }));
    try {
      const nodes = await this.redis.nodes();

      const src = await Promise.all(
        nodes.map((node: any) => {
          return node.keys('*');
        }),
      );

      let keys = _.flatten(src);

      keys = await _.map(keys, (key: any) => {
        return parseInt(key, 10);
      });

      return keys;

    } catch (error) {
      console.log(JSON.stringify({
        error,
        service: 'redis',
        call: 'keys',
        value: 'ERROR',
      }));
      return false;
    }
  }

  public async check(requestId: number): Promise<boolean> {
    try {
      const ttl = await this.redis.ttl(requestId);
      console.log(JSON.stringify({
        service: 'redis',
        value: 'CALL',
        call: 'check',
        ttl,
        ttlMax: this.config.reCheckTime,
      }));
       // TODO: .env -> config
      if (ttl > 0) {
        console.log(JSON.stringify({
          service: 'redis',
          value: 'CALL',
          call: 'parseInt(req, 10)',
          ttl: parseInt(ttl, 10),
          ttlMax: this.config.reCheckTime,
        }));

        throw new Error(`req num ${requestId} locked`);
      }
    } catch (error) {
      console.log(error);
      console.log(JSON.stringify({
        requestId,
        error,
        service: 'redis',
        call: 'check',
        value: 'ERROR',
      }));
      return false;
    }
    return true;
  }

  public async clean(requestIds: any[]): Promise<boolean> {
    try {
      for (const requestId of requestIds) {
        await this.redis.del(parseInt(requestId, 10));
        // break;
      }

      console.log(JSON.stringify({
        service: 'redis',
        value: 'CALL',
        call: 'cleaned',
        requestIds,
      }));
       // TODO: .env -> config
    } catch (error) {
      console.log(error);
      console.log(JSON.stringify({
        error,
        service: 'redis',
        call: 'CLEAN',
        value: 'ERROR',
      }));
      return false;
    }
    return true;
  }
}
