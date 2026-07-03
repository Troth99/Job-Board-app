import type { Job } from "./Job.model";

export interface SavedJob {
  _id?: string;
  job: Job;
  addedAt: string;
}