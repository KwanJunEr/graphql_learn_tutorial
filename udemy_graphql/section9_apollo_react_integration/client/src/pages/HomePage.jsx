import { useEffect, useState } from 'react';
import JobList from '../components/JobList';
import { getJobs } from '../lib/graphql/queries';
import { useJobs } from '../lib/graphql/hooks';

function HomePage() {
  const {jobs, loading, error} = useJobs();
  // const [jobs, setJobs] = useState([]);
  // useEffect(() => {
  //   getJobs().then(setJobs);
  // }, []);

  if(loading) return <div>Loading jobs....</div>
  if(error) return <div className="has-text-danger">Failed to load jobs</div>;

  console.log('[HomePage] jobs:', jobs);
  return (
    <div>
      <h1 className="title">
        Job Board
      </h1>
      <JobList jobs={jobs} />
    </div>
  );
}

export default HomePage;
