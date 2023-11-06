import { PaginationData } from '../../../Interfaces/interfaces';
import { ChangeEvent, useEffect } from 'react';
import './MainPaginator.scss'

interface PaginationProps {
  paginationData: PaginationData;
  setPaginationData: React.Dispatch<React.SetStateAction<PaginationData>>;
  searchPokemon: () => void;
}

const MainPaginator = (props: PaginationProps) => {

  const nextPage = () => {
    props.setPaginationData((prevState) => {
      return {
        ...prevState,
        currPage: prevState.currPage + 1,
      }
    });
    
  };
  const previousPage = () => {
    props.setPaginationData((prevState) => {
      return {
        ...prevState,
        currPage: prevState.currPage - 1,
      }
    });
  };
  const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
    props.setPaginationData((prevState) => {
      return {
        ...prevState,
        currPage: 1,
        currPageSize: +event.target.value,
      }
    });
  }

  useEffect(() => {
    console.log('Prop is ', props.paginationData.currPage);
    props.searchPokemon();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[props.paginationData])

  return (
      <ul className="pagination-wrapper">
        <button 
        disabled={props.paginationData.currPage <= 1}
        onClick={previousPage}
        >{'<'}</button>
        <li>{props.paginationData.currPage}</li>
        <button
        disabled={props.paginationData.currPage >= props.paginationData.totalCount / props.paginationData.currPageSize}
        onClick={nextPage}
        >{'>'}</button>
        <li>
          <select 
          className="pagination-select" 
          value={props.paginationData.currPageSize}
          onChange={handleChange}>
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