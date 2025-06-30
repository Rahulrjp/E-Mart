import React, { useEffect } from 'react'
import { getData } from '../context/DataContext'
import { useNavigate } from 'react-router-dom';

const Category = () => {

  const navigate = useNavigate()

    const {data} = getData();


    const getUniqueCategory = (data, property) => {
        let newVal = data?.map((curElem) => {
            return curElem[property];
        })
        newVal = [...new Set(newVal)];
        return newVal;
    }

    const categoryOnlyData = getUniqueCategory(data, 'category');
  return (
    <div className='bg-[#101829]'>
      <div className='max-w-7xl mx-auto flex flex-wrap gap-4 items-center md:justify-around justify-center py-7 px-4'>
        {
          categoryOnlyData.map((item,index)=>{
            return (
              <div key={index}>
                  <button className='uppercase bg-gradient-to-r from-red-500 to-purple-500 text-white px-3 py-1 rounded-md cursor-pointer' onClick={()=> navigate(`/category/${item}`)}>
                    {item}
                  </button>
              </div>
            )
          })
        }
      </div>
    </div>
  )
}

export default Category