import PaginationItem from '../pagination-item/pagination-item';

type PropsType = {
  pageNumber: number,
  totalPages: number,
  step?: number,
}

function Pagination(props: PropsType): JSX.Element {
  const {pageNumber, totalPages, step = 2} = props;
  const pageNumbers = [];

  for(let i = pageNumber - step; i <= pageNumber + step; i++) {
    if (i < 1) {
      continue;
    }
    if (i > totalPages) {
      break;
    }
    pageNumbers.push(i);
  }

  const nextPage = pageNumber + 1;
  const previouslyPage = pageNumber - 1;
  const isNotFirstPage = previouslyPage > 0;
  const isNotLastPage = pageNumber < totalPages;
  return (
    <div className="pagination page-content__pagination">
      <ul className="pagination__list">
        {isNotFirstPage &&
          <PaginationItem
            className="pagination__page--prev"
            id="prev"
            linkText="Назад"
            pageNumber={previouslyPage}
          />}

        {pageNumbers.map((pageNum) => (
          <PaginationItem
            key={pageNum}
            isActive={pageNum === pageNumber}
            linkText={pageNum.toString()}
            pageNumber={pageNum}
          />
        ))}

        {isNotLastPage &&
          <PaginationItem
            className="pagination__page--next"
            id="next"
            linkText="Далее"
            pageNumber={nextPage}
          />}
      </ul>
    </div>
  );
}

export default Pagination;
