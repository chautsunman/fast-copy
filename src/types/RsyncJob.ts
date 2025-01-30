import { RsyncJobConfigs } from './RsyncJobConfigs';

export class RsyncJob {
  readonly id: number;

  readonly rsyncJobConfigs: RsyncJobConfigs;

  private readonly job: any;

  constructor(rsyncJobConfigs: RsyncJobConfigs) {
    this.id = Math.random();
    this.rsyncJobConfigs = rsyncJobConfigs;
  }
}
