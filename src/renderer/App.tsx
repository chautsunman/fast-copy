import React, { useCallback, useContext, useState } from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import PlayArrow from '@mui/icons-material/PlayArrow';
import { AppContext } from '../app/AppContext';
import { RsyncJobConfigs } from '../types/RsyncJobConfigs';

function App() {
  const { jobs, addJob, removeJob, runJob } = useContext(AppContext);
  const [selectedJobs, setSelectedJobs] = useState<number[]>([]);
  const [source, setSource] = useState('');
  const [destination, setDestination] = useState('');

  const onToggleJob = useCallback(
    (value: number) => () => {
      const currentIndex = selectedJobs.indexOf(value);
      const newChecked = [...selectedJobs];

      if (currentIndex === -1) {
        newChecked.push(value);
      } else {
        newChecked.splice(currentIndex, 1);
      }

      setSelectedJobs(newChecked);
    },
    [selectedJobs, setSelectedJobs],
  );

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
      <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
        {jobs.map((job) => {
          const labelId = `checkbox-list-label-${job}`;

          return (
            <ListItem
              key={job.id}
              secondaryAction={
                <IconButton
                  edge="end"
                  aria-label="comments"
                  onClick={() => handleRunJob(job.id)}
                >
                  <PlayArrow />
                </IconButton>
              }
              disablePadding
            >
              <ListItemButton role={undefined} onClick={onToggleJob(job.id)} dense>
                <ListItemIcon>
                  <Checkbox
                    edge="start"
                    checked={selectedJobs.includes(job.id)}
                    tabIndex={-1}
                    disableRipple
                    inputProps={{ 'aria-labelledby': labelId }}
                  />
                </ListItemIcon>
                <ListItemText
                  id={labelId}
                  primary={`Job ${job.id}`}
                  secondary={`${job.rsyncJobConfigs.source} - ${job.rsyncJobConfigs.destination}`}
                />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>

      <button onClick={handlePickSource}>Pick Source</button>
      <span>{source}</span>
      <button onClick={handlePickDestination}>Pick Destination</button>
      <span>{destination}</span>
      <button onClick={handleAddJob}>Add Job</button>
    </div>
  );
}

export default App;
