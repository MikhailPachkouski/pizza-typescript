import React from 'react';

import styles from '../scss/NotFound.module.scss'

const NotFound = () => {
    return (
        <div className={styles.root}>
           <h1 >Not Found!</h1>
            <p className={styles.description}>В нашем интернет-магазине не найдена такая страница</p>
        </div>
    );
};

export default NotFound;