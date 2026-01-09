import { useState } from 'react';
import JobList from '../components/JobList';
import { useJobs } from '../lib/graphql/hooks';
import PaginatorBar from "../components/PaginationBar"

const JOBS_PER_PAGE = 5;

function HomePage() {
  const [currentPage, setCurrentPage] = useState(1);
  const { jobs, loading, error } = useJobs(JOBS_PER_PAGE, (currentPage - 1) * JOBS_PER_PAGE);

  console.log('[HomePage]', { jobs, loading, error });
  if (loading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div className="has-text-danger">Data unavailable</div>;
  }

  const totalPages = Math.ceil(jobs.totalCount/JOBS_PER_PAGE);
  return (
    <div>
      <h1 className="title">
        Job Board
      </h1>
      {/* <div className='my-5'>
        <button className="button is-light"   disabled={currentPage === 1}
 onClick={() => {
          if (currentPage > 1) {
            setCurrentPage(currentPage - 1)
          }
        }
        }>  Previous</button>
        <span className="mx-2 "> {`${currentPage} of ${totalPages}`}</span>
        <button disabled={currentPage === totalPages} className="button is-light" onClick={() => setCurrentPage(currentPage + 1)}> Next</button>
      </div> */}
      <PaginatorBar currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage}/>
      <JobList jobs={jobs.items} />

    </div>
  );
}

export default HomePage;
