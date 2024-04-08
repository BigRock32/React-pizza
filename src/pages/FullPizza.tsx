import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

const FullPizza: React.FC = () => {
   const { id } = useParams()
   const navigate = useNavigate()
   const [pizza, setPizza] = useState<{
      imageUrl: string,
      title: string,
      price: number
   }>()

   React.useEffect(() => {
      const fetchPizza = async () => {
         try {
            const { data } = await axios.get(`https://64a5784800c3559aa9bfc2df.mockapi.io/items/${id}`)
            setPizza(data)
         } catch (error) {
            alert('Произошла ошибка при запросе пиццы')
            navigate('/')
         }
      }
      fetchPizza()
   }, [])

   if (!pizza) {
      return 'Загрузка...'
   }

   return (
      <div className='container'>
         <img src={pizza.imageUrl} alt={pizza.title} />
         <h2>{pizza.title}</h2>
         <h4>{pizza.price} ₽</h4>
      </div>
   )
}

export default FullPizza
