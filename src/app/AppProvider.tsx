import React, { useState, ReactNode, useCallback, useMemo } from 'react';
import { AppContext } from './AppContext';
import { RsyncJob } from '../types/RsyncJob';
import { RsyncJobConfigs } from '../types/RsyncJobConfigs';

const AppProvider = ({ children }: { children: ReactNode }) => {
  const [jobs, setJobs] = useState<RsyncJob[]>([]);

  const addJob = useCallback(
    (rsyncJobConfigs: RsyncJobConfigs) => {
      setJobs((prevJobs) => {
        const job = new RsyncJob(rsyncJobConfigs);
        return [...prevJobs, job];
      });
    },
    [setJobs],
  );

  const removeJob = useCallback(
    (id: number) => {
      setJobs((prevJobs) => prevJobs.filter((job) => job.id !== id));
    },
    [setJobs],
  );

  const contextValue = useMemo(
    () => ({
      jobs,
      addJob,
      removeJob,
    }),
    [jobs, addJob, removeJob],
  );

  return (
    <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>
  );
};

export { AppProvider };
