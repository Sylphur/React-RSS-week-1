import { ChangeEvent } from 'react';
import { useRouter } from 'next/router';

const MainPaginator = () => {
  const router = useRouter();
  const { limit, page, search } = router.query;
  const actualPage = page ? Number(page) : 1;
  const actualPageSize = limit ? Number(limit) : 12;

  const nextPage = async () => {
    await router.push({
      query: {search: search, page: actualPage + 1, limit: limit}
    })
  };
  const previousPage = async () => {
    await router.push({
      query: {search: search, page: actualPage - 1, limit: limit}
    })
  };
  const handleChange = async (event: ChangeEvent<HTMLSelectElement>) => {
    await router.push({
      query: {search: search, page: 1, limit: +event.target.value}
    })
  };

  return (
    <ul className="pagination-wrapper">
      <button
        disabled={actualPage <= 1}
        onClick={previousPage}
      >
        {'<'}
      </button>
      <li>{actualPage}</li>
      <button
        disabled={
          actualPage >=
          400 /
            actualPageSize
        }
        onClick={nextPage}
      >
        {'>'}
      </button>
      <li>
        <select
          className="pagination-select"
          value={actualPageSize}
          onChange={handleChange}
          name="pagination-select"
        >
          {[6, 12, 18, 24].map((value) => (
            <option key={value} value={value}>
              {value}
            </option>
          ))}
        </select>
      </li>
    </ul>
  );
};

export default MainPaginator;
