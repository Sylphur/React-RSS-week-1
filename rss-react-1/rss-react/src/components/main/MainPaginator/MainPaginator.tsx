import { ChangeEvent, useContext, useEffect } from 'react';
// import './MainPaginator.scss';
import { generateLink } from '../../../services/link-generation.service';
import { useActions } from '../../../state/redux-hooks';
import { useRouter } from 'next/router';

const MainPaginator = () => {
  // const navigate = useNavigate();
  // const useAppContext = useContext(AppContext);
  const router = useRouter();
  const { limit, page, search } = router.query;
  const actualPage = page ? Number(page) : 1;
  const actualPageSize = limit ? Number(limit) : 12;
  // const { incrementCurrPage, decrementCurrPage, setCurrPage, setCurrPageSize } =
  //   useActions();

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
    // useAppContext.setPaginationData((prevState) => {
    //   return {
    //     ...prevState,
    //     currPage: 1,
    //     currPageSize: +event.target.value,
    //   };
    // });
    // setCurrPage(1);
    // setCurrPageSize(+event.target.value);
  };
  // const getNavigate = (pageNumber: number, pageSize: number) => {
  //   navigate(generateLink(pageNumber, pageSize));
  // };

  // useEffect(() => {
  //   getNavigate(
  //     useAppContext.paginationData.currPage,
  //     useAppContext.paginationData.currPageSize
  //   );
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [useAppContext.paginationData]);

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
