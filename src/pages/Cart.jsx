import React, { useState } from 'react'
import { useCart } from '../context/CartContext'
import { FaRegTrashAlt } from 'react-icons/fa';
import { LuNotebookText } from 'react-icons/lu';
import { MdDeliveryDining } from 'react-icons/md';
import { GiShoppingBag } from 'react-icons/gi';
import { useUser } from '@clerk/clerk-react';
import { useNavigate } from 'react-router-dom';
import emptyCart from "../assets/empty-cart.png"
import { TbSticker2 } from 'react-icons/tb';
import promocodes from "../promocodes/promocode.json"
import { CrossIcon, Delete } from 'lucide-react';
import { FaDeleteLeft } from 'react-icons/fa6';
import { toast } from 'react-toastify';

const Cart = ({ location, getLocation, isValidPromo, setIsValidPromo }) => {

  const { cartItem, updateQuantity, removeFromCart } = useCart();
  const { user } = useUser();
  const navigate = useNavigate()
  const [inputPromocode, setInputPromocode] = useState('');
  const [appliedPromocode, setAppliedPromocode] = useState('');
  const [isApplied, setIsApplied] = useState(false)


  const [name , setName] = useState(user?.fullName)
  const [address , setAddress] = useState(location.county)
  const [state,setState] = useState(location.state)
  const [postCode , setPostCode] = useState(location.postcode)
  const [country , setCountry] = useState(location.country)
  const [phoneNumber , setPhoneNumber] = useState('')


  const totalPrice = cartItem.reduce((total, item) => total + (item?.price) * (item.quantity), 0) * 85;
  const discount = isValidPromo ? Math.round(promocodes.promocodes[appliedPromocode.toUpperCase()] * totalPrice / 100) : 0;

  const handleChange = (e) => {
    setInputPromocode(e.target.value);
  }

  const handleClick = () => {
    const value = promocodes.promocodes.hasOwnProperty(inputPromocode.toUpperCase())
    setAppliedPromocode(inputPromocode);
    setIsValidPromo(value);
    if (value) {
      setInputPromocode('')
      setIsApplied(value)
      toast.success("Promocode Applied")
    }
    else {
      toast.warn("Invalid Promocode")
    }
  }

  const handleKeyDown = (e) => {

  }


  return (
    <div className='mt-10 max-w-6xl mx-auto mb-5 px-4 md:p-0'>
      {
        cartItem.length > 0 ? <div>
          <h1 className='font-bold text-2xl px-2'>My Cart ({cartItem.length})</h1>
          <div className=''>
            <div className='mt-10'>
              {
                cartItem.map((item, index) => {
                  return <div key={index} className='bg-gray-100 p-5 rounded-md flex items-center justify-between mt-3 w-full'>
                    <div className='flex items-center gap-4'>
                      <img src={item.image} alt={item.title} className='w-20 h-20 rounded-md cursor-pointer' onClick={()=>navigate(`/products/${item.id}`)}/>
                      <div>
                        <h1 className='md:w-[300px] line-clamp-2'>{item?.title}</h1>
                        <p className='text-red-500 font-semibold text-lg'>₹{(item.price * 85).toFixed(2)}</p>
                      </div>
                    </div>
                    <div className='flex md:gap-10 items-center'>
                      <div className='bg-[#046262] text-white flex sm:gap-4 gap-2 px-2 py-0.5 rounded-md font-bold text-xl'>
                        <button className='cursor-pointer' onClick={() => updateQuantity(item.id, item.quantity - 1)}>-</button>
                        <span>{item.quantity}</span>
                        <button className='cursor-pointer' onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
                      </div>
                      <span className='hover:bg-white/60 transition-all rounded-full p-3 hover:shadow-2xl' onClick={() => removeFromCart(item.id)}>
                        <FaRegTrashAlt className='text-red-500 text-2xl cursor-pointer' /></span>
                    </div>
                  </div>
                })
              }
            </div>
            <div className='grid lg:grid-cols-2 md:gap-20 gap-10 grid-cols-1'>
              {/* Address  */}
              <div className='bg-gray-100 rounded-md p-7 mt-4 space-y-2'>
                <h1 className='text-gray-800 font-bold text-xl'>Delivery info</h1>
                <div className='flex flex-col space-y-1'>
                  <label htmlFor="">Full Name</label>
                  <input type="text" placeholder='Enter your name' value={name} onChange={(e)=> setName(e.target.value)} className='p-2 rounded-md' />
                </div>
                <div className='flex flex-col space-y-1'>
                  <label htmlFor="">Address</label>
                  <input type="text" placeholder='Enter your Address' className='p-2 rounded-md' value={address} 
                  onChange={(e) => setAddress(e.target.value)} />
                </div>

                <div className='flex w-full gap-5 flex-col md:flex-row'>
                  <div className='flex flex-col space-y-1 w-full'>
                    <label htmlFor="">State</label>
                    <input type="text" placeholder='Enter your State' className='p-2 rounded-md 2-full' value={state} 
                    onChange={(e) => setState(e.target.value)}/>
                  </div>
                  <div className='flex flex-col space-y-1 w-full'>
                    <label htmlFor="">PostCode</label>
                    <input type="text" placeholder='Enter your postcode' className='p-2 rounded-md 2-full' value={postCode} 
                    onChange={(e)=> setPostCode(e.target.value)}/>
                  </div>
                </div>
                <div className='flex flex-col md:flex-row w-full gap-5'>
                  <div className='flex flex-col space-y-1 w-full'>
                    <label htmlFor="">Country</label>
                    <input type="text" placeholder='Enter your country' className='p-2 rounded-md 2-full' value={country}
                    onChange={(e)=>setCountry(e.target.value)} />
                  </div>
                  <div className='flex flex-col space-y-1 w-full'>
                    <label htmlFor="">Phone no.</label>
                    <input type="text" placeholder='Enter your phone number' className='p-2 rounded-md 2-full'/>
                  </div>
                </div>
                <div className='w-full flex justify-center'>
                  <button className='bg-red-500 text-white px-11 py-1.5 rounded-md cursor-pointer my-3 hover:bg-red-400'>Submit</button>
                </div>
                <div className='flex items-center justify-center w-full text-gray-700'>
                  -----OR-----
                </div>
                <div className='flex justify-center'>
                  <button className='bg-red-500 text-white px-3 py-2 cursor-pointer rounded-md hover:bg-red-400' onClick={getLocation}>Detect Location</button>
                </div>
              </div>
              {/* Bill Details  */}
              <div className='bg-white border-gray-100 border shadow-xl rounded-md p-7 mt-4 space-y-2 h-max'>
                <h1 className='text-gray-800 font-bold text-xl'>Bill Details</h1>
                <div className='flex justify-between items-center'>
                  <h1 className='flex gap-1 items-center text-gray-700'><span><LuNotebookText /></span>Items Total</h1>
                  <p>₹{totalPrice}</p>
                </div>
                <div className='flex justify-between items-center'>
                  <h1 className='flex gap-1 items-center text-gray-700'><span><MdDeliveryDining /></span>Items Delivery Charge</h1>
                  <p className='text-green-600 font-semibold'><span className='text-gray-600 line-through'>₹99</span> Free</p>
                </div>
                <div className='flex justify-between items-center'>
                  <h1 className='flex gap-1 items-center text-gray-700'><span><GiShoppingBag /></span>Handling Charge</h1>
                  <p className='text-gray-500 font-semibold'>₹50</p>
                </div>

                {
                  isValidPromo ? <div className='flex justify-between items-center'>
                    <h1 className='flex gap-1 items-center text-gray-700'><span><GiShoppingBag /></span>Discount</h1>
                    <div className='bg-gray-200 md:px-4 px-2 py-1 rounded-md flex items-center md:gap-3 gap-1 font-semibold sm:text-sm text-xs'><p className=''>{appliedPromocode.toUpperCase()} ({promocodes.promocodes[appliedPromocode.toUpperCase()
                    ]}% Off)</p><span><FaRegTrashAlt className='h-[15px] w-[15px] cursor-pointer' onClick={() => {
                      setIsValidPromo(false)
                      setIsApplied(false)
                    }} /></span></div>
                    <p className='text-gray-500 font-semibold'>- ₹{discount}</p>
                  </div> : <div></div>
                }
                <hr className='text-gray-200 mt-2' />
                <div className='flex justify-between items-center'>
                  <h1 className='font-semibold text-lg'>Grand Total</h1>
                  <p className='font-semibold text-lg'>₹{totalPrice + 50 - discount}</p>
                </div>
                <div>
                  <h1 className={`font-semibold text-gray-700 mb-3 mt-7`}>Apply Promocode</h1>
                  <div className='flex gap-3'>
                    <input type="text" placeholder='Enter Promocode' className={`p-2 rounded-md w-full`} value={inputPromocode} onChange={handleChange} disabled={isApplied}/>
                    <button className='bg-white text-black border border-gray-400 px-4 cursor-pointer py-1 rounded-md hover:bg-gray-100 hover:scale-105 transition-all' onClick={handleClick}>{isApplied ? "Applied" : "Apply"}</button>
                  </div>
                </div>
                <button className='bg-red-500 text-white px-3 py-2 rounded-md w-full cursor-pointer mt-3 hover:bg-red-400'>Proceed to Checkout</button>
              </div>
            </div>
          </div>
        </div> : <div className='flex flex-col gap-3 justify-center items-center h-[600px]'>
          <h1 className='text-red-500/80 font-bold text-5xl text-muted'>Your cart is empty</h1>
          <img src={emptyCart} alt="" className='w-[400px=' />
          <button className='bg-red-500 text-white px-3 py-2 rounded-md cursor-pointer hover:bg-red-400' onClick={() => navigate('/products')}>Continue Shopping</button>
        </div>
      }
    </div>
  )
}

export default Cart