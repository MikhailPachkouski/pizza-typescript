import React, {useCallback, useEffect, useRef} from 'react';
import Categories from "../components/Categories";
import Sort from "../components/Sort";
import Skeleton from "../components/Skeleton";
import PizzaBlock from "../components/PizzaBlock";
import Pagination from "../components/Pagination";
import {useDispatch, useSelector} from "react-redux";
import FilterSlice, {
    FilterSliceState,
    selectFilter,
    setCategoryId,
    setCurrentPage,
    setFilters,
    SortType
} from '../redux/slices/filterSlice'
import qs from 'qs'
import {useNavigate} from "react-router-dom";
import {typeSort} from '../components/Sort'
import {fetchPizzas, selectPizza} from "../redux/slices/pizzaSlice";
import {useAppDispatch} from "../redux/store";


const Home: React.FC = () => {

    const {categoryId, selectedSort, currentPage, searchValue} = useSelector(selectFilter)
    const {items, status} = useSelector(selectPizza)
    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    const isSearch = useRef(false)
    const isMounted = useRef(false)


    const categoryURL = categoryId > 0 ? `&category=${categoryId}` : ''
    const sortURL = `sortBy=${selectedSort.sortValue}&order=asc`
    const search = searchValue ? `&search=${searchValue}` : ''

    const skeletons = [...new Array(6)].map((el, index) => <Skeleton key={index}/>)

    // const items = pizzas.filter((pizza) => pizza.title.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase())).map((pizza) => <PizzaBlock key={pizza.id} {...pizza}/>)
    const itemsOfPizza = items.map((pizza) => <PizzaBlock key={pizza.id} {...pizza}/>)

    const getPizzas = async () => {
        // setIsLoading(true)
        // axios.get(`https://633dc3e1f2b0e623dc7af0ee.mockapi.io/items?page=${currentPage}&limit=5${categoryURL}&${sortURL}${search}`)
        //     .then(res => {
        //         setPizzas(res.data)
        //         setIsLoading(false)
        //     })
        //     .catch(err => {
        //         console.log(err)
        //         setIsLoading(false)
        //     })

        dispatch(
            fetchPizzas({
                currentPage: String(currentPage),
                categoryURL,
                sortURL,
                search
            }))
    }

    useEffect(() => {
        if (isMounted.current) {
            const queryString = qs.stringify({
                selectedSort: selectedSort.sortValue,
                categoryId,
                currentPage
            })
            navigate(`?${queryString}`)
        }
        isMounted.current = true
    }, [categoryId, selectedSort, searchValue, currentPage])

    useEffect(() => {


        if (window.location.search) {
            const paramsSearch = qs.parse(window.location.search.substring(1))
            const paramsSort = typeSort.find((el) => el.sortValue === paramsSearch.selectedSort)

            const allParamsSearch = {
                ...paramsSearch,
                selectedSort: paramsSort
            } as FilterSliceState

            dispatch(setFilters(allParamsSearch))
            isSearch.current = true
        }
    }, [])

    useEffect(() => {
        // fetch(`https://633dc3e1f2b0e623dc7af0ee.mockapi.io/items?page=${currentPage}&limit=5${categoryURL}&${sortURL}${search}` )
        //     .then(res => res.json())
        //     .then(json => {
        //         setPizzas(json)
        //         setIsLoading(false)
        //     })
        if (!isSearch.current) {
            getPizzas()
        }
        isSearch.current = false

        window.scroll(0, 0)
    }, [categoryId, selectedSort, searchValue, currentPage]);


    const onClickCategoryHandler = useCallback((id: number) => {
        dispatch(setCategoryId(id))
    }, [])

    return (
        <>
            <div className="content__top">
                <Categories value={categoryId} onClickCategory={onClickCategoryHandler}/>
                <Sort/>
            </div>
            <h2 className="content__title">?????? ??????????</h2>
            {
                status === 'error' ? (
                        <div className='content__error-info'>
                            <h2>
                                ?????????????????? ????????????
                            </h2>
                            <p>
                                ???? ?????????????? ?????????????????? ????????????
                            </p>
                        </div>
                    )
                    : (
                        <div className="content__items">
                            {
                                status === 'loading' ? skeletons : itemsOfPizza
                            }
                        </div>
                    )}
            <Pagination onChangePage={(page: number) => dispatch(setCurrentPage(page))}/>
        </>
    );
};

export default Home;