/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import Queue, { Job } from 'bull';

import redisConfig from '../config/redis';
import * as jobs from '../jobs';

const queues = Object.values(jobs).map((job) => ({
  bull: new Queue(job.key, { redis: redisConfig }),
  name: job.key,
  handle: job.hendle,
}));

export default {
  queues,
  add(name: string, data: object): Promise<Job> {
    const queue = this.queues.find((value) => value.name === name);
    return queue!.bull.add(data);
  },
  process(): void {
    return this.queues.forEach((queue) => {
      queue.bull.process(queue.handle);
      queue.bull.on('failed', (job, err) => {
        console.log('Job Failed', queue.name, job.data);

        console.log('job Error: ', err);
      });
    });
  },
};
