import { createContext } from 'react';
import { RsyncJob } from '../types/RsyncJob';
import { RsyncJobConfigs } from '../types/RsyncJobConfigs';

interface AppContextProps {
  jobs: RsyncJob[];
  addJob: (job: RsyncJobConfigs) => void;
  removeJob: (id: number) => void;
}

const AppContext = createContext<AppContextProps>({} as AppContextProps);

export { AppContext };
