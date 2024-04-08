import ReactPaginate from 'react-paginate'
import s from './Pagination.module.scss'

import { useSelector, useDispatch } from 'react-redux'
import { setCurrentPage } from '../../redux/slices/filterSlice.js'

const Pagination: React.FC = () => {
   //const pageCount = useSelector((state) => state.filter.pageCount)
   const dispatch = useDispatch()
   return (
      <ReactPaginate
         className={s.root}
         breakLabel="..."
         nextLabel=">"
         previousLabel="<"
         onPageChange={(event) => dispatch(setCurrentPage(event))}
         pageRangeDisplayed={4}
         pageCount={3}
         renderOnZeroPageCount={null}
      />
   )
}

export default Pagination

