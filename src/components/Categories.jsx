import React from 'react'

import { useSelector, useDispatch } from 'react-redux'
import { setCategoryId } from '../redux/slices/filterSlice'

function Categories() {
   const categoryId = useSelector((state) => state.filter.categoryId)
   const dispatch = useDispatch()

   const categories = [
      { id: 0, name: 'Все' },
      { id: 1, name: 'Мясные' },
      { id: 2, name: 'Вегетарианские' },
      { id: 3, name: 'Гриль' },
      { id: 4, name: 'Острые' },
      { id: 5, name: 'Закрытые' }
   ]


   return (
      <div className="categories">
         <ul>
            {
               categories.map((cat, i) => {
                  return <li key={cat.id}
                     onClick={() => dispatch(setCategoryId(i))}
                     className={categoryId === i ? 'active' : ''}>{cat.name}</li>
               })
            }
         </ul>
      </div>
   )
}

export default Categories