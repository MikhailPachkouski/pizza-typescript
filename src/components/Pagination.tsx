import React from 'react';
import ReactPaginate from "react-paginate";
import styles from '../scss/Pagination.module.scss'
import {useSelector} from "react-redux";

const Pagination = ({onChangePage}) => {
    const currentPage = useSelector(state => state.filter.currentPage)

    return (
        <ReactPaginate
            className={styles.root}
            breakLabel="..."
            nextLabel=">"
            onPageChange={(event) => onChangePage(event.selected + 1)}
            pageRangeDisplayed={8}
            pageCount={3}
            forcePage={currentPage - 1}
            previousLabel="<"
            renderOnZeroPageCount={null}
        />
    );
};

export default Pagination; 