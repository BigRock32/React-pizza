import ReactPaginate from 'react-paginate'
import s from './Pagination.module.scss'

import { useSelector, useDispatch } from 'react-redux'
import { setCurrentPge } from '../../redux/slices/filterSlice.js'

const Pagination = () => {
   const pageCount = useSelector((state) => state.filter.pageCount)
   const dispatch = useDispatch()
   return (
      <ReactPaginate
         className={s.root}
         breakLabel="..."
         nextLabel=">"
         previousLabel="<"
         onPageChange={(event) => dispatch(setCurrentPge(event))}
         pageRangeDisplayed={4}
         pageCount={3}
         renderOnZeroPageCount={null}
      />
   )
}

export default Pagination

