import React, { useCallback, useContext, useState } from 'react';
import { AppContext } from '../app/AppContext';
import './App.css';
import { RsyncJobConfigs } from '../types/RsyncJobConfigs';

function App() {
  const { jobs, addJob, removeJob, runJob } = useContext(AppContext);
  const [source, setSource] = useState('');
  const [destination, setDestination] = useState('');

  const handlePickSource = useCallback(async () => {
    const result = await window.electron.pickDirectory();
    if (result) {
      setSource(result);
    }
  }, [setSource]);

  const handlePickDestination = useCallback(async () => {
    const result = await window.electron.pickDirectory();
    if (result) {
      setDestination(result);
    }
  }, [setDestination]);

  const handleAddJob = () => {
    const newJobConfigs = new RsyncJobConfigs(source, destination, '');
    addJob(newJobConfigs);
    setSource('');
    setDestination('');
  };

  const handleRunJob = useCallback(
    async (id: number) => {
      runJob(id);
    },
    [runJob],
  );

  return (
    <div>
      <h1>Rsync GUI</h1>
      <button onClick={handlePickSource}>Pick Source</button>
      <span>{source}</span>
      <button onClick={handlePickDestination}>Pick Destination</button>
      <span>{destination}</span>
      <button onClick={handleAddJob}>Add Job</button>
      <ul>
        {jobs.map((job) => (
          <li key={job.id}>
            {job.rsyncJobConfigs.source} - {job.rsyncJobConfigs.destination}
            <button onClick={() => handleRunJob(job.id)}>Run</button>
            <button onClick={() => removeJob(job.id)}>Remove</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
