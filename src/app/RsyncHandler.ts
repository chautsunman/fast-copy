import { build } from 'rsync';
import { RsyncJobConfigs } from '../types/RsyncJobConfigs';

export default class RsyncHandler {
  async runJob(rsyncJobConfigs: RsyncJobConfigs) {
    console.log(rsyncJobConfigs);

    const job = build({
      source: rsyncJobConfigs.source,
      destination: rsyncJobConfigs.destination,
      flags: rsyncJobConfigs.flags,
    });

    // job.execute(
    //   (error, code, cmd) => {
    //
    //   },
    //   (data) => {
    //     console.log(data.toString());
    //   },
    //   (data) => {
    //     console.log(data.toString());
    //   },
    // );
  }
}
