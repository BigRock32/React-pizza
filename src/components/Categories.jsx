import React from 'react'

function Categories({ value, onClickCategory }) {

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
                     onClick={() => onClickCategory(i)}
                     className={value === i ? 'active' : ''}>{cat.name}</li>
               })
            }
         </ul>
      </div>
   )
}

export default Categories