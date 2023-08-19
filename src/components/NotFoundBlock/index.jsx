import React from 'react'

import s from './NotFoundBlock.module.scss'

function NotFoundBlock() {
   return (
      <div className={s.root}>
         <h1>
            <span>:d</span>
            <br />
            Ничего не найдено
         </h1>
         <p className={s.description} > К сожалению в нашем пицца магазине такой страницы нет</p>
      </div>
   )
}

export default NotFoundBlock