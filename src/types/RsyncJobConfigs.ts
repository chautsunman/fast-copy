export class RsyncJobConfigs {
  source: string;

  destination: string;

  flags: string;

  constructor(source: string, destination: string, flags: string) {
    this.source = source;
    this.destination = destination;
    this.flags = flags;
  }
}
