import React from 'react'
import axios from 'axios';
import qs from 'qs'

import Categories from '../components/Categories';
import Sort, { sortList } from '../components/Sort';
import PizzaBlock from '../components/PizzaBlock';
import Skeleton from '../components/PizzaBlock/Skeleton';
import Pagination from '../components/Pagination';
import NotFound from './NotFound';
import { SearchContext } from '../App';

import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { setFilters } from '../redux/slices/filterSlice';

function Home() {
   const navigate = useNavigate()
   const dispatch = useDispatch()
   const isSearch = React.useRef(false)
   const isMounted = React.useRef(false)

   const { searchValue } = React.useContext(SearchContext)
   const { categoryId, sort, currentPage } = useSelector((state) => state.filter)

   const [items, setItems] = React.useState([])
   const [isLoading, setIsLoading] = React.useState(true)

   const fetchPizzas = () => {
      setIsLoading(true)

      const sortBy = sort.sortProperty
      const dir = sort.dir
      const category = categoryId > 0 ? `&category=${categoryId}` : ''
      const search = searchValue ? `&search=${searchValue}` : ''

      axios
         .get(`https://64a5784800c3559aa9bfc2df.mockapi.io/items?page=${currentPage}&limit=4${category}&sortBy=${sortBy}&order=${dir}${search}`)
         .then(res => {
            if (!res.status === 200) {
               throw new Error("Ошибка " + res.status)
            }

            setItems(res.data)
            setIsLoading(false)
         })
         .catch(error => {
            console.error("Произошла ошибка:", error)
            setItems(['error'])
            setIsLoading(false)
         })
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
         fetchPizzas()
      }
      isSearch.current = false
   }, [categoryId, sort, searchValue, currentPage])


   const pizzas = items[0] !== 'error' ? items.map((pizza) => <PizzaBlock key={pizza.id} {...pizza} />) : ['error']
   const skeletons = [...new Array(6)].map(() => <Skeleton />)

   return (
      <>
         <div className="content__top">
            <Categories />
            <Sort />
         </div>
         <h2 className="content__title">Все пиццы</h2>
         {pizzas[0] !== 'error' ? <div className="content__items">
            {isLoading ? skeletons : pizzas}
         </div> : <NotFound />}
         <Pagination />
      </>
   )
}

export default Home