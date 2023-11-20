import { ChangeEvent, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './MainPaginator.scss';
import { generateLink } from '../../../services/link-generation.service';
import { AppContext } from '../../../AppContext';
import { useActions } from '../../../state/redux-hooks';

const MainPaginator = () => {
  const navigate = useNavigate();
  const useAppContext = useContext(AppContext);
  const { incrementCurrPage, decrementCurrPage, setCurrPage, setCurrPageSize } = useActions();

  const nextPage = () => {
    useAppContext.setPaginationData((prevState) => {
      return {
        ...prevState,
        currPage: prevState.currPage + 1,
      };
    });
    incrementCurrPage();
  };
  const previousPage = () => {
    useAppContext.setPaginationData((prevState) => {
      return {
        ...prevState,
        currPage: prevState.currPage - 1,
      };
    });
    decrementCurrPage();
  };
  const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
    useAppContext.setPaginationData((prevState) => {
      return {
        ...prevState,
        currPage: 1,
        currPageSize: +event.target.value,
      };
    });
    setCurrPage(1);
    setCurrPageSize(+event.target.value);

  };
  const getNavigate = (pageNumber: number, pageSize: number) => {
    navigate(generateLink(pageNumber, pageSize));
  };

  useEffect(() => {
    getNavigate(
      useAppContext.paginationData.currPage,
      useAppContext.paginationData.currPageSize
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [useAppContext.paginationData]);

  return (
    <ul className="pagination-wrapper">
      <button
        disabled={useAppContext.paginationData.currPage <= 1}
        onClick={previousPage}
      >
        {'<'}
      </button>
      <li>{useAppContext.paginationData.currPage}</li>
      <button
        disabled={
          useAppContext.paginationData.currPage >=
          useAppContext.paginationData.totalCount /
            useAppContext.paginationData.currPageSize
        }
        onClick={nextPage}
      >
        {'>'}
      </button>
      <li>
        <select
          className="pagination-select"
          value={useAppContext.paginationData.currPageSize}
          onChange={handleChange}
          name="pagination-select"
        >
          {[4, 8, 12, 20].map((value) => (
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
