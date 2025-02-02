// Disable no-unused-vars, broken for spread args
/* eslint no-unused-vars: off */
import { contextBridge, ipcRenderer, IpcRendererEvent } from 'electron';
import { RsyncJobConfigs } from '../types/RsyncJobConfigs';
import { RsyncJob } from '../types/RsyncJob';

export type Channels = 'ipc-example';

const electronHandler = {
  ipcRenderer: {
    sendMessage(channel: Channels, ...args: unknown[]) {
      ipcRenderer.send(channel, ...args);
    },
    on(channel: Channels, func: (...args: unknown[]) => void) {
      const subscription = (_event: IpcRendererEvent, ...args: unknown[]) =>
        func(...args);
      ipcRenderer.on(channel, subscription);

      return () => {
        ipcRenderer.removeListener(channel, subscription);
      };
    },
    once(channel: Channels, func: (...args: unknown[]) => void) {
      ipcRenderer.once(channel, (_event, ...args) => func(...args));
    },
  },
  runRsync: async (rsyncJobConfigs: RsyncJobConfigs) => {
    return ipcRenderer.invoke('run-rsync', rsyncJobConfigs);
  },
  pickDirectory: async (): Promise<string | null> => {
    return ipcRenderer.invoke('pick-directory');
  },
  getSavedJobs: (): Promise<RsyncJob[]> => {
    return ipcRenderer.invoke('getSavedJobs');
  },
  setSavedJobs: (rsyncJobs: RsyncJob[]) => {
    return ipcRenderer.invoke('setSavedJobs', rsyncJobs);
  },
};

contextBridge.exposeInMainWorld('electron', electronHandler);

export type ElectronHandler = typeof electronHandler;
