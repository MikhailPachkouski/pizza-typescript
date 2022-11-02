import React from 'react';
import ReactPaginate from "react-paginate";
import styles from '../scss/Pagination.module.scss'
import {useSelector} from "react-redux";
import {RootState} from "../redux/store";

type PaginationProps = {
    onChangePage: (page: number) => void
}

const Pagination :React.FC<PaginationProps> = ({onChangePage}) => {
    const currentPage = useSelector((state: RootState) => state.filter.currentPage)

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
        />
    );
};

export default Pagination; 