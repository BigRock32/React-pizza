import React from 'react'

import Categories from '../components/Categories';
import Sort from '../components/Sort';
import PizzaBlock from '../components/PizzaBlock';
import Skeleton from '../components/PizzaBlock/Skeleton';

function Home() {

   const [items, setItems] = React.useState([])
   const [isLoading, setIsLoading] = React.useState(true)
   const [categoryId, setCategoryId] = React.useState(0)
   const [sortType, setSortType] = React.useState({
      name: 'популярности',
      sortProperty: 'rating',
      dir: 'ask'
   })


   React.useEffect(() => {
      setIsLoading(true)

      const sortBy = sortType.sortProperty
      const dir = sortType.dir
      const category = categoryId > 0 ? `category=${categoryId}` : ''

      fetch(
         `https://64a5784800c3559aa9bfc2df.mockapi.io/items?${category}&sortBy=${sortBy}&order=${dir}`
      )
         .then((res) => res.json())
         .then((arr) => {
            setItems(arr)
            setIsLoading(false)
         })
      window.scrollTo(0, 0)
   }, [categoryId, sortType])

   return (
      <>
         <div className="content__top">
            <Categories value={categoryId} onClickCategory={setCategoryId} />
            <Sort value={sortType} onClickSortValue={setSortType} />
         </div>
         <h2 className="content__title">Все пиццы</h2>
         <div className="content__items">
            {
               isLoading
                  ? [...new Array(6)].map(() => <Skeleton />)
                  : items.map((pizza) => <PizzaBlock key={pizza.id} {...pizza} />)
            }
         </div>
      </>
   )
}

export default Home