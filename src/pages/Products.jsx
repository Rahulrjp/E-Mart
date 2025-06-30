import React, { useEffect, useState } from 'react'
import { getData } from '../context/DataContext'
import FilterSection from '../components/FilterSection';
import Loading from "../assets/Loading4.webm";
import ProductCard from '../components/ProductCard';
import { Pagination } from '../components/Pagination';
import Lottie from 'lottie-react';
import notfound from "../assets/notfound.json"
import { Filter, Search } from 'lucide-react';

const Products = () => {

  const { data, fetchAllProducts } = getData();

  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');
  const [brand, setBrand] = useState("All");
  const [priceRange, setPriceRange] = useState([0, 100000]);
  const [page, setPage] = useState(1);
  const [filterOn , setFilterOn] = useState(false);

  useEffect(() => {
    fetchAllProducts(0);
    window.scrollTo(0,0);
  }, []);


  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
    setPage(1);
  }
  const handleBrandChange = (e) => {
    setBrand(e.target.value)
    setPage(1);
  }

  const filteredData = data?.filter((item) => item.title.toLowerCase().includes(search.toLowerCase()) && (category === "All" || item.category === category) && (brand === "All" || item.brand === brand) && item.price >= priceRange[0] && item.price <= priceRange[1])

  const pageHandler = (selectedPage) => {
    setPage(selectedPage);
  }
  const dynamicPage = Math.ceil(filteredData?.length / 8);



  return (
    <div>
      <div className='flex justify-between md:hidden p-6'>
        <h1 className='text-2xl font-semibold text-gray-700'>Products</h1>
        <button className='px-3 py-1 rounded-md flex items-center gap-3' onClick={()=> setFilterOn(!filterOn)}>Filter <span><Filter className='h-4 w-4'/></span></button>
      </div>
      <div className='max-w-6xl  mx-auto px-4 mb-10'>
        {
          data?.length > 0 ? (
            <>
              <div className='flex gap-8'>
                <FilterSection search={search} setSearch={setSearch} brand={brand} setBrand={setBrand} priceRange={priceRange} setPriceRange={setPriceRange} category={category} setCategory={setCategory} handleCategoryChange={handleCategoryChange} handleBrandChange={handleBrandChange} filterOn={filterOn} setFilterOn={setFilterOn}/>
                {
                  filteredData?.length > 0 ? (
                    <div className='flex flex-col justify-center items-center'>
                      <div className='grid md:grid-cols-4 grid-cols-2 gap-7 mt-10'>
                        {
                          filteredData?.slice(page * 8 - 8, page * 8).map((product, index) => {
                            return <ProductCard product={product} key={index}/>
                          })
                        }
                      </div>
                      <Pagination pageHandler={pageHandler} page={page} dynamicPage={dynamicPage} />
                    </div>
                  ) : (
                    <div className='flex justify-center items-center md:h-[600px]mt-10 md:w-[900px]' >
                      <Lottie animationData={notfound} classID='w-[500px]'/>
                    </div>
                  )
                }

              </div>

            </>
          ) : (
            <div className='flex items-center justify-center h-[400px]'>
              <video muted autoPlay loop>
                <source src={Loading} type='video/webm' />
              </video>
            </div>
          )
        }
      </div>
    </div>
  )
}

export default Products