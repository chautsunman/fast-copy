import { RsyncJobConfigs } from '../types/RsyncJobConfigs';

export default class RsyncHandler {
  async runJob(rsyncJobConfigs: RsyncJobConfigs) {
    console.log(rsyncJobConfigs);
  }
}
