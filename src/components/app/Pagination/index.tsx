import React, { useMemo, useState } from 'react';
import { Pagination } from 'react-bootstrap';
import { IPaginationProps } from './Pagination.interface';

const PaginationComponent = ({ totalItems, itemsPage, onPageChange }: IPaginationProps) => {
  const [actualPage, setActualPage] = useState(1);
  const totalPages = useMemo(() => Math.ceil(totalItems / itemsPage), [totalItems, itemsPage]);

  const handlePageChange = (page: number) => {
    setActualPage(page);
    onPageChange(page);
  };

  const getPaginationItems = () => {
    const items = [];

    for (let countPage = 1; countPage <= totalPages; countPage++) {
      items.push(
        <Pagination.Item
          key={countPage}
          active={countPage === actualPage}
          onClick={() => handlePageChange(countPage)}
        >
          {countPage}
        </Pagination.Item>
      );
    }

    return items;
  };

  return (
    <Pagination>
      <Pagination.Prev
        onClick={() => handlePageChange(actualPage - 1)}
        disabled={actualPage === 1}
      />
      {getPaginationItems()}
      <Pagination.Next
        onClick={() => handlePageChange(actualPage + 1)}
        disabled={actualPage === totalPages}
      />
    </Pagination>
  );
};

export default PaginationComponent;
