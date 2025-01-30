import { RsyncJob } from '../types/RsyncJob';

export interface UserStoreData {
  savedJobs: RsyncJob[];
}

export const initialUserStoreData: UserStoreData = {
  savedJobs: [],
};
