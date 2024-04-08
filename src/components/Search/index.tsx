import React from 'react'

import s from './Search.module.scss'
import debounce from 'lodash.debounce'
import { useDispatch } from 'react-redux'
import { setSearchValue } from '../../redux/slices/filterSlice'

const Search: React.FC = () => {
   const dispatch = useDispatch()
   const [value, setValue] = React.useState('')
   const inputRef = React.useRef<HTMLInputElement>(null)

   const onClickClearInput = () => {
      dispatch(setSearchValue(''))
      setValue('')
      inputRef.current?.focus()
   }

   const updateSearchValue = React.useCallback(
      debounce((str: string) => {
         dispatch(setSearchValue(str))
      }, 500),
      []
   )

   const onChangeInput = (event: any) => {
      setValue(event.target.value)
      updateSearchValue(event.target.value)
   }

   return (
      <div className={s.root}>
         <input
            ref={inputRef}
            value={value}
            onChange={onChangeInput}
            className={s.input} placeholder='Поиск пиццы ...' />
         <svg className={s.icon} xmlns="http://www.w3.org/2000/svg" width="21" height="22" viewBox="0 0 21 22" fill="none">
            <path fillRule="evenodd" clipRule="evenodd" d="M2.00244 9.58146C2.00244 5.70046 5.16044 2.54346 9.04144 2.54346C12.9214 2.54346 16.0794 5.70046 16.0794 9.58146C16.0794 13.4625 12.9214 16.6205 9.04144 16.6205C5.16044 16.6205 2.00244 13.4625 2.00244 9.58146ZM20.4974 20.0405L15.8984 15.4535C17.2544 13.8725 18.0794 11.8235 18.0794 9.58146C18.0794 4.59846 14.0244 0.543457 9.04144 0.543457C4.05744 0.543457 0.00244141 4.59846 0.00244141 9.58146C0.00244141 14.5655 4.05744 18.6205 9.04144 18.6205C11.0634 18.6205 12.9264 17.9445 14.4334 16.8175L19.0854 21.4565L20.4974 20.0405Z" fill="black" />
         </svg>
         {value && (<svg onClick={onClickClearInput} className={s.iconClear} width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M19 19L10 10M10 10L1 1M10 10L19.0001 1M10 10L1 19.0001" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
         </svg>)}
      </div>
   )
}

export default Search
