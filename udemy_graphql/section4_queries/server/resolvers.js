import { getCompany } from './db/companies.js';
import { getJob, getJobs, getJobsByCompany } from './db/jobs.js';

export const resolvers = {
  Query: {
    jobs: () => getJobs(),
    //can use args if dun want to direclty acccess it 
    job: (_root, {id})=>getJob(id),
    company: (_root, {id})=>getCompany(id)
  },

  Company:{
    jobs:(company)=>getJobsByCompany(company.id),
  },
  
  Job: {
    company: (job) => getCompany(job.companyId),
    date: (job) => toIsoDate(job.createdAt),
  },
};

function toIsoDate(value) {
  return value.slice(0, 'yyyy-mm-dd'.length);
}
