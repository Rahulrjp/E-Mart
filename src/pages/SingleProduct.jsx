import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios';
import Loading from "../assets/Loading4.webm";
import Breadcrums from '../components/Breadcrums';
import { IoCartOutline } from 'react-icons/io5';
import { useCart } from '../context/CartContext';

const SingleProduct = () => {
    const params = useParams();

    const { addToCart , updateQuantity} = useCart();
    const [singleProduct, setSingleProduct] = useState();
    const [quantity, setQuantity] = useState(1);

    const getSingleProduct = async () => {
        try {
            const res = await axios.get(`https://fakestoreapi.in/api/products/${params.id}`);
            const product = res.data.product;
            setSingleProduct(product);
        }
        catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getSingleProduct();
    }, [])

    const orignalPrice = singleProduct ? Math.round(singleProduct.price + (singleProduct.price * singleProduct.discount / 100)) : 0;

    return (
        <div>
            {
                singleProduct ? <div className='px-4 pb-4 md:px-0'>
                    <Breadcrums title={singleProduct.title} />
                    <div className='max-w-6xl mx-auto md:p-6 grid md:grid-cols-2 grid-cols-1 gap-10'>
                        {/* Product Image */}
                        <div className='w-full'>
                            <img src={singleProduct.image} alt={singleProduct.title} className='rounded-2xl w-full object-cover' />
                        </div>
                        {/* Product Details  */}
                        <div className='flex flex-col gap-6'>
                            <h1 className='md:text-3xl text-xl font-bold text-gray-800'>{singleProduct.title}</h1>
                            <div className='text-gray-700'>{singleProduct.brand?.toUpperCase()}/ {singleProduct.category?.toUpperCase()}/{singleProduct.model}</div>
                            <p className='text-xl text-red-500 font-bold flex gap-5'>₹{(singleProduct.price * 85).toFixed(2)}<span className='line-through text-gray-700'>₹{orignalPrice * 85}</span><span className='bg-red-500 text-white px-2 py-1 rounded-lg text-md'>10% discount</span></p>
                            <p className='text-gray-600'>{singleProduct.description}</p>

                            {/* Quantity Selection  */}

                            <div className='flex items-center gap-5'>
                                <label htmlFor="" className='text-sm font-medium text-gray-700'>Quantity : </label>
                                <button className='text-2xl font-bold cursor pointer hover:bg-gray-100 transition-all duration-3 w-8 h-8 flex items-center rounded-full justify-center' onClick={() => quantity === 1 ? setQuantity(quantity) : setQuantity(quantity - 1)}>-</button>
                                <input type="number" min={1} className='w-20 border border-gray-300 rounded-lg px-3 py-1 focus:outline-none focus:ring-red-500 appearance-none' value={quantity} onChange={(e)=>setQuantity(e.target.value)}/>
                                <button className='text-2xl font-bold cursor pointer hover:bg-gray-100 transition-all duration-3 w-8 h-8 flex items-center rounded-full justify-center' onClick={() => setQuantity(quantity + 1)}>+</button>
                            </div>
                            <div className='flex gap-4 mt-4'>
                                <button className='px-6 py-2 flex gap-2 text-lg bg-red-500  text-white rounded-md hover:bg-re-400 cursor-pointer' onClick={()=>addToCart(singleProduct)}><IoCartOutline className='w-6 h-6' /> Add to cart</button>
                            </div>
                        </div>
                    </div>
                </div> :
                    <div>
                        <div className='flex items-center justify-center h-screen'>
                            <video muted autoPlay loop>
                                <source src={Loading} type='video/webm' />
                            </video>
                        </div>
                    </div>
            }
        </div>
    )
}

export default SingleProduct