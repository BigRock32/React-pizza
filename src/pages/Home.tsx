import React from 'react'
import qs from 'qs'

import Categories from '../components/Categories';
import Sort, { sortList } from '../components/Sort';
import PizzaBlock from '../components/PizzaBlock';
import Skeleton from '../components/PizzaBlock/Skeleton';
import Pagination from '../components/Pagination';
import NotFound from './NotFound';

import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { selectFilter, setFilters } from '../redux/slices/filterSlice';
import { fetchPizzas, selectPizzaData } from '../redux/slices/pizzaSlice';

const Home: React.FC = () => {
   const navigate = useNavigate()
   const dispatch = useDispatch()
   const isSearch = React.useRef(false)
   const isMounted = React.useRef(false)

   const { items, status } = useSelector(selectPizzaData)
   const { categoryId, sort, currentPage, searchValue } = useSelector(selectFilter)

   const getPizzas = async () => {
      const sortBy = sort.sortProperty
      const dir = sort.dir
      const category = categoryId > 0 ? `&category=${categoryId}` : ''
      const search = searchValue ? `&search=${searchValue}` : ''

      dispatch(
         // @ts-ignore
         fetchPizzas({
            sortBy,
            dir,
            category,
            search,
            currentPage
         }))
   }

   // Если изменили параметры и был первый рендер
   React.useEffect(() => {
      if (isMounted.current) {
         const queryString = qs.stringify({
            sortProperty: sort.sortProperty,
            categoryId,
            currentPage
         })
         navigate(`?${queryString}`)
      }
      isMounted.current = true
   }, [categoryId, sort, searchValue, currentPage])

   // Если был первый рендер, то проверяем ЮРЛ параметры и созраняем в ркдаксе
   React.useEffect(() => {
      if (window.location.search) {
         const params = qs.parse(window.location.search.substring(1))
         const sort = sortList.find(obj => obj.sortProperty === params.sortProperty)

         dispatch(
            setFilters({
               ...params,
               sort
            })
         )
         isSearch.current = true
      }
   }, [])

   // Если был первый рендер, то запрашиваем пиццы
   React.useEffect(() => {
      window.scrollTo(0, 0)

      if (!isSearch.current) {
         getPizzas()
      }
      isSearch.current = false
   }, [categoryId, sort, searchValue, currentPage])


   const pizzas = items.map((pizza: any) => <PizzaBlock key={pizza.id} {...pizza} />)
   const skeletons = [...new Array(6)].map(() => <Skeleton />)

   return (
      <>
         <div className="content__top">
            <Categories />
            <Sort />
         </div>
         <h2 className="content__title">Все пиццы</h2>
         {status !== 'error' ? <div className="content__items">
            {status === 'pending' ? skeletons : pizzas}
         </div> : <NotFound />}
         <Pagination />
      </>
   )
}

export default Home