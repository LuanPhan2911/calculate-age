import React, { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';

// Example paginateData, to simulate fetching from another resources.


function PaginatedItems({ itemsPerPage, PaginateDisplay, paginateData }) {
  // We start with an empty list of paginateData.
  const [currentItems, setCurrentItems] = useState(null);
  const [pageCount, setPageCount] = useState(0);
  // Here we use item offsets; we could also use page offsets
  // following the API or data you're working with.
  const [itemOffset, setItemOffset] = useState ( 0 ) ;

  useEffect(() => {
    // Fetch paginateData from another resources.
    const endOffset = itemOffset + itemsPerPage;
    setCurrentItems(paginateData.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(paginateData.length / itemsPerPage));
  }, [itemOffset, itemsPerPage, paginateData]);

  // Invoke when user click to request another page.
  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % paginateData.length;
    setItemOffset(newOffset);
  };

  return (
    <>
      <PaginateDisplay paginateData={currentItems}/>
     
      <ReactPaginate
        breakLabel="..."
        nextLabel="next >"
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        pageCount={pageCount}
        previousLabel="< previous"
        renderOnZeroPageCount={null}
        containerClassName={'pagination justify-content-center'}
        pageClassName={'page-item'}
        pageLinkClassName={'page-link'}
        activeClassName={'active'}
        previousClassName={'page-item'}
        previousLinkClassName={'page-link'}
        nextClassName={'page-item'}
        nextLinkClassName={'page-link'}
      />
    </>
  );
}
export default PaginatedItems;